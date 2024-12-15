using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MapController(AppDbContext context)
        {
            _context = context;
        }

        // [HttpGet]
        // public IActionResult GetAllMaps()
        // {
        //     return Ok(_context.Map);
        // }

        [HttpGet]
        public IActionResult GetMapsByUser(int id)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var maps = _context.Map.Where(m => m.OwnerId == userId);

            return Ok(new { Maps = maps });
        }

        public class MapControllerModel
        {
            public required string Name { get; set; }
            public required string Filter { get; set; }
            public required string MapStyle { get; set; }
        }

        [HttpPost]
        public IActionResult CreateMap([FromBody] MapControllerModel map)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var newMapId = _context.Map.Any() ? _context.Map.Max(m => m.Id) + 1 : 1;

            var newMap = new Map
            {
                Id = newMapId,
                Name = map.Name,
                Filter = map.Filter,
                MapStyle = map.MapStyle,
                OwnerId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            _context.Map.Add(newMap);
            _context.SaveChanges();

            return Ok(new { Message = "Successfully created map", Map = newMap });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMap(int id, [FromBody] MapControllerModel updatedMap)
        {
            var map = _context.Map.SingleOrDefault(m => m.Id == id);

            if (map == null)
            {
                return NotFound();
            }

            map.Name = updatedMap.Name;
            map.Filter = updatedMap.Filter;
            map.MapStyle = updatedMap.MapStyle;
            map.UpdatedAt = DateTime.Now;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMap(int id)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var map = _context.Map.SingleOrDefault(m => m.Id == id);

            if (map == null)
            {
                return NotFound();
            }

            if (map.OwnerId != userId)
            {
                return Unauthorized("User does not own this map!");
            }

            _context.Map.Remove(map);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
