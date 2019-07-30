using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace core_server.Features
{
    public class ChatHub : Hub
    {
        private readonly ILogger _logger;

        public ChatHub(ILogger<ChatHub> logger)
        {
            _logger = logger;
        }


        // broadCast to all connections in all groups , all users
        public async Task SendMessage(string user, string message)
        {
             _logger.LogCritical($"Sending message: {message}");
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public Task SendMessageToGroup(string groupName, string message)
        {
            _logger.LogCritical($"In group: {groupName} and sending message: {message}");
            return Clients.Group(groupName).SendAsync("ReceiveMessage", $"{Context.ConnectionId}: {message}");
        }

        public async Task AddToGroup(string user, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            _logger.LogCritical($"In group: {groupName} with connection Id: {Context.ConnectionId}");
            await Clients.Group(groupName).SendAsync("ReceiveMessage", $"{user} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string user, string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            _logger.LogCritical($"In group: {groupName} with connection Id: {Context.ConnectionId}");
            await Clients.Group(groupName).SendAsync("ReceiveMessage", $"{user} has left the group {groupName}.");
        }


    }
}