using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
namespace SignalRChat.Hubs


{
    public class ChatHub : Hub
    {
        private readonly ILogger _logger;

        public ChatHub(ILogger<ChatHub> logger) {
            _logger = logger;
        }


        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
            _logger.LogCritical(user  + " :    " + message);
        }
    }
}