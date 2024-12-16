using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("get")]
        public IActionResult GetUserAccount()
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var user = _context.User.SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return Unauthorized("User not found");
            }

            return Ok(user);
        }

        // NOTE: Incomplete
        [HttpPatch("update")]
public IActionResult Update([FromBody] RegisterModel model)
{
    // Validate the input model
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Get the user ID from the claims
    var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

    // Find the user in the database
    var user = _context.User.SingleOrDefault(u => u.Id == userId);
    if (user == null)
    {
        return NotFound("User not found");
    }

    // Update user properties
    user.FirstName = model.FirstName;
    user.LastName = model.LastName;
    user.Email = model.Email;

    // Save changes to the database
    _context.SaveChanges();

    // Return a success response
    return Ok(new { message = "User updated successfully", user });
}


        [HttpDelete("delete")]
        public IActionResult Delete([FromBody] LoginModel model)
        {
            var user = _context.User.SingleOrDefault(u =>
                u.Id == Int32.Parse(ClaimTypes.NameIdentifier)
            );

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            _context.User.Remove(user);
            _context.SaveChanges();

            return Ok("User deleted");
        }
    }
}
