using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace backend
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FieldController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetFieldsByUser(int id)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var fields = _context.Field.Where(f => f.OwnerId == userId).ToList();

            return Ok(new { Fields = fields });
        }

        [HttpPost]
        public IActionResult CreateField([FromBody] FieldControllerModel fieldModel)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var newFieldId = _context.Field.Any() ? _context.Field.Max(f => f.Id) + 1 : 1;

            var newField = new Field
            {
                Id = newFieldId,
                Name = fieldModel.Name,
                Location = fieldModel.Location,
                OwnerId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            _context.Field.Add(newField);
            _context.SaveChanges();

            return Ok(new { Message = "Successfully created field", Field = newField });
        }

        public class FieldControllerModel
        {
            public required string Name { get; set; }
            public required string Location { get; set; }
        }
    }
}