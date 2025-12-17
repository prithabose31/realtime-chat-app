namespace ChatApp.API.Interfaces
{
    public interface IChatClient
    {
        Task ReceiveMessage(string user, string message);
        Task UserConnected(string username);
        Task UserDisconnected(string username);
    }
}
