namespace ChatApp.API.DTOs
{
    public class MessageDto
    {
        public int MessageId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }
}
