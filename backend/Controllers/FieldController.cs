using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace backend
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FieldController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetFieldsByUser(int id)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var fields = _context.Fields.Where(f => f.OwnerId == userId).ToList();

            return Ok(new { Fields = fields });
        }

        [HttpPost]
        public IActionResult CreateField([FromBody] FieldControllerModel fieldModel)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var newFieldId = _context.Fields.Any() ? _context.Fields.Max(f => f.Id) + 1 : 1;

            var newField = new Field
            {
                Id = newFieldId,
                Name = fieldModel.Name,
                Location = fieldModel.Location,
                OwnerId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            _context.Fields.Add(newField);
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