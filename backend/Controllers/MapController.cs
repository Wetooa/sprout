
using Microsoft.AspNetCore.Mvc;

namespace backend
{

  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {

        private readonly AppDbContext _context;
        private readonly IConfiguration _iconfiguration;

        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _iconfiguration = configuration;
        }

        [HttpGet("get-all")]
        public IActionResult GetAllUsers()
        {
            var user = _context.User;
            return Ok(user);
        }

        [HttpPatch("update")]
        public IActionResult Update([FromBody] RegisterModel model)
        {
            var user = _context.User.SingleOrDefault(u => u.Email == model.Email);

            if (user == null || user.Password != AuthUtils.HashPassword(model.Password))
            {
                return Unauthorized("Invalid credentials");
            }

            _context.SaveChanges();

            return Ok("User updated");
        }


        [HttpDelete("delete")]
        public IActionResult Delete([FromBody] LoginModel model)
        {
            var user = _context.User.SingleOrDefault(u => u.Email == model.Email);

            if (user == null || user.Password != AuthUtils.HashPassword(model.Password))
            {
                return Unauthorized("Invalid credentials");
            }

            _context.User.Remove(user);
            _context.SaveChanges();

            return Ok("User deleted");
        }
  }
}
