using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend
{
    public static class AuthUtils
    {
        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        public static string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(
                _iconfiguration["Jwt:SecretKey"]
                    ?? throw new InvalidOperationException("Jwt:SecretKey is not set")
            );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[] { new Claim(ClaimTypes.Name, user.FirstName + user.LastName) }
                ),
                Expires = DateTime.UtcNow.AddHours(24),
                Issuer = _iconfiguration["Jwt:Issuer"],
                Audience = _iconfiguration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                ),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static bool ValidateToken(string authToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();

            SecurityToken validatedToken;
            IPrincipal principal = tokenHandler.ValidateToken(
                authToken,
                validationParameters,
                out validatedToken
            );
            return true;
        }

        public static TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = false, // Because there is no expiration in the generated token
                ValidateAudience = false, // Because there is no audiance in the generated token
                ValidateIssuer = false, // Because there is no issuer in the generated token
                ValidIssuer = "Sample",
                ValidAudience = "Sample",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), // The same key as the one that generate the token
            };
        }
    }
}
