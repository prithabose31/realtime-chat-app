using ChatApp.API.Data;
using ChatApp.API.DTOs;
using ChatApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly AppDbContext _db;

        public MessageController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("history")]
        public async Task<ActionResult<List<MessageDto>>> GetHistory(int? userId, int limit = 50)
        {
            var query = _db.Messages
                .Include(m => m.User)
                .OrderByDescending(m => m.Timestamp)
                .Take(limit);

            if (userId.HasValue)
            {
                query = (IOrderedQueryable<Message>)query.Where(m => m.UserId == userId.Value);
            }

            var messages = await query
                .OrderBy(m => m.Timestamp)
                .Select(m => new MessageDto
                {
                    MessageId = m.MessageId,
                    Username = m.User.Username,
                    Content = m.Content,
                    Timestamp = m.Timestamp
                })
                .ToListAsync();

            return Ok(messages);
        }
    }
}
