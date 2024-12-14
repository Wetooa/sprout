using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


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


        [HttpDelete("delete")]
        public IActionResult Delete([FromBody] LoginModel model)
        {
            var user = _context.User.SingleOrDefault(u => u.Email == model.Email);

            if (user == null || user.Password != AuthUtils.HashPassword(model.Password))
            {
                return Unauthorized("Invalid credentials");
            }

            _context.User.Remove(user);

            return Ok("User deleted");
        }
  }
}
