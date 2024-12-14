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

            var token = AuthUtils.GenerateJwtToken(user);

            return Ok(new { Email = model.Email, Token = token });
        }

    }
}


