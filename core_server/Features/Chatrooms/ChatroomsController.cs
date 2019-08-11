using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using core_server.Domain;
using Microsoft.AspNetCore.Authorization;
using core_server.Infrastructure.Security;
using MediatR;

namespace core_server.Features.Chatrooms
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatroomsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ChatroomsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //api/Chatrooms/{name}
        [HttpGet]
        public async Task<IEnumerable<Chatroom>> Get(string username)
        {
            List.Query query = new List.Query
            {
                Name = username
            };
            return await _mediator.Send(query);
        }

        //api/Chatrooms
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtIssuerOptions.Schemes)]
        public async Task<Create.ChatroomData> Post(Create.ChatroomData chatroomData)
        {
            return await _mediator.Send(chatroomData);
        }

        //api/Chatrooms
        [HttpDelete("{id}")]
        public async Task<Unit> Delete(int id)
        {
            Delete.DeleteCommand deleteCommand = new Delete.DeleteCommand
            {
                Id = id
            };
            return await _mediator.Send(deleteCommand);
        }
    }
}