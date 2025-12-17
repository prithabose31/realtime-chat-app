using ChatApp.API.Data;
using ChatApp.API.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _db;
        private static readonly Dictionary<string, string> ConnectedUsers = new();

        public ChatHub(AppDbContext db)
        {
            _db = db;
        }

        public override async Task OnConnectedAsync()
        {
            var username = Context.GetHttpContext()?.Request.Query["username"].ToString();

            if (!string.IsNullOrEmpty(username))
            {
                // Add to connected users
                ConnectedUsers[Context.ConnectionId] = username;

                // Load and send last 50 messages to the new user
                var recentMessages = await _db.Messages
                    .Include(m => m.User)
                    .OrderByDescending(m => m.Timestamp)
                    .Take(50)
                    .OrderBy(m => m.Timestamp)
                    .Select(m => new
                    {
                        Username = m.User.Username,
                        Content = m.Content,
                        Timestamp = m.Timestamp
                    })
                    .ToListAsync();

                foreach (var msg in recentMessages)
                {
                    await Clients.Caller.SendAsync("ReceiveMessage", msg.Username, msg.Content);
                }

                // Notify all users that someone joined
                await Clients.All.SendAsync("UserConnected", username);

                // Send list of online users to the new user
                var onlineUsers = ConnectedUsers.Values.Distinct().ToList();
                await Clients.Caller.SendAsync("OnlineUsers", onlineUsers);
            }

            await base.OnConnectedAsync();
        }

        public async Task SendMessage(string username, string message)
        {
            // Find user in database
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user != null)
            {
                // Save message to database
                var msg = new Message
                {
                    UserId = user.UserId,
                    Content = message,
                    Timestamp = DateTime.UtcNow
                };

                _db.Messages.Add(msg);
                await _db.SaveChangesAsync();

                // Broadcast to all clients
                await Clients.All.SendAsync("ReceiveMessage", username, message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (ConnectedUsers.TryGetValue(Context.ConnectionId, out var username))
            {
                ConnectedUsers.Remove(Context.ConnectionId);

                // Only notify if no other connections for this user
                if (!ConnectedUsers.ContainsValue(username))
                {
                    await Clients.All.SendAsync("UserDisconnected", username);
                }
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
