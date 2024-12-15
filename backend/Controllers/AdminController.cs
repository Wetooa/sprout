using Microsoft.AspNetCore.Mvc;

namespace backend
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-all")]
        public IActionResult GetAllUsers()
        {
            var user = _context.User;
            return Ok(user);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int Id)
        {
            var user = _context.User.SingleOrDefault(u => u.Id == Id);

            if (user == null)
            {
                return Unauthorized("User does not exist!");
            }

            _context.User.Remove(user);
            _context.SaveChanges();

            return Ok("User deleted");
        }
    }
}
