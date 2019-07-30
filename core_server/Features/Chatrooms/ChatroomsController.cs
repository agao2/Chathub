using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using core_server.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using core_server.Infrastructure.Security;
using core_server.Infrastructure;
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
            List.Query query = new List.Query {
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

        // //api/Chatrooms
        // [HttpDelete("{id}")]
        // public async Task<ActionResult> Delete(int id)
        // {
        //     Chatroom chatroom = await _context.Chatrooms.Where(u => u.ChatroomId == id).SingleOrDefaultAsync();

        //     if (chatroom == null)
        //         return StatusCode(403, "Chatroom does not exist");

        //     _context.Chatrooms.Remove(chatroom);
        //     return StatusCode(200, "Chatroom has been deleted");

        // }

    }
}