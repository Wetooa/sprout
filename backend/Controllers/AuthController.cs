//authcontorller.cs
using Microsoft.AspNetCore.Mvc;

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

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            // Check if a user with the same email already exists
            var user = _context.User.SingleOrDefault(u => u.Email == model.Email);

            if (user != null)
            {
                return Conflict(new { Message = "User with this email already exists." });
            }

            // Create a new user
            var newUser = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = AuthUtils.HashPassword(model.Password),
                SubscriptionTier = "Free", // FIX: This should be changed later
                Role = "User",             // FIX: This should be changed later
                CreatedAt = DateTime.UtcNow,
            };

            // Save the new user in the database
            _context.User.Add(newUser);
            _context.SaveChanges();

            // Return success response with additional metadata if needed
            return Ok(new Dictionary<string, string>
            {
                { "Message", "Account Created Successfully." }
            });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // Check if the user exists
            var user = _context.User.SingleOrDefault(u => u.Email == model.Email);

            if (user == null || user.Password != AuthUtils.HashPassword(model.Password))
            {
                return Unauthorized(new { Message = "Invalid email or password." });
            }

            // Generate JWT token (or similar)
            var token = AuthUtils.GenerateJwtToken(user);

            // Return token and user metadata
            return Ok(new Dictionary<string, string>
            {
                { "Message", "Login Successful." },
                { "Token", token },
                { "UserId", user.Id.ToString() },
                { "Email", user.Email },
                { "FirstName", user.FirstName },
                { "LastName", user.LastName }
            });
        }
    }
}
