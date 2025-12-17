using ChatApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _db;

        public UserController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("online")]
        public async Task<ActionResult<List<string>>> GetOnlineUsers()
        {
            var users = await _db.Users
                .Where(u => u.IsActive)
                .Select(u => u.Username)
                .ToListAsync();

            return Ok(users);
        }
    }
}
