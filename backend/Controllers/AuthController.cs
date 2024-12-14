using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace backend
{

    public class RegisterModel
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }

        public required string Password { get; set; }
    }

    public class LoginModel
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }


    [Route("api/[controller]")]

    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _iconfiguration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _iconfiguration = configuration;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            var user = _context.User.SingleOrDefault(u => u.Email == model.Email);

            if (user != null)
            {
                return Unauthorized("User with email already exists.");
            }

            var newUser = new User
            {
                Id = 0, // This will be generated by the database
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = AuthUtils.HashPassword(model.Password),
                SubscriptionTier = "Free", // FIX: This should be changed later
                CreatedAt = DateTime.UtcNow,
            };

            _context.User.Add(newUser);
            _context.SaveChanges();

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var user = _context.User.SingleOrDefault(u => u.Email == model.Email);

            if (user == null || user.Password != AuthUtils.HashPassword(model.Password))
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = GenerateJwtToken(user);

            return Ok(new { Email = model.Email, Token = token });
        }
        
        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_iconfiguration["Jwt:SecretKey"] ?? throw new InvalidOperationException("Jwt:SecretKey is not set"));


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.FirstName + user.LastName) }),
                Expires = DateTime.UtcNow.AddHours(24),
                Issuer = _iconfiguration["Jwt:Issuer"],
                Audience = _iconfiguration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}


