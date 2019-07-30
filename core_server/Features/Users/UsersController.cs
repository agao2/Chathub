using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MediatR;

namespace core_server.Features.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }


        //POST api/Users
        [HttpPost]
        public async Task<Create.UserData> Post(Create.UserData data)
        {
            return await _mediator.Send(data);
        }

        //PATCH api/Users
        [HttpPatch]
        public async Task<Edit.EditData> Edit(Edit.EditData data)
        {
            return await _mediator.Send(data);
        }

        // api/Users/Login
        [HttpPost("login")]
        public async Task<Login.AuthenticatedUser> Login(Login.LoginData data)
        {
            return await _mediator.Send(data);
        }
    }
}