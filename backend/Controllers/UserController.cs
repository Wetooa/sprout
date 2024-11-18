using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // A sample in-memory list of items
        private static readonly List<string> Items = new List<string>
        {
            "Item1", "Item2", "Item3"
        };

        // GET: api/items
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(Items); // Return a 200 OK response with the items
        }
    }
}
