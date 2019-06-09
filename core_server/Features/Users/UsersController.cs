using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using core_server.Domain;
using Microsoft.EntityFrameworkCore;
using core_server.Infrastructure;
using core_server.Infrastructure.Security;
using Microsoft.AspNetCore.Http;
using MediatR;

namespace core_server.Features.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        private readonly IMediator _mediator;

        public UsersController(ApplicationDbContext context,
                                IJwtTokenGenerator JwtTokenGenerator,
                                IMediator mediator)
        {
            _context = context;
            _jwtTokenGenerator = JwtTokenGenerator;
            _mediator = mediator;
        }

        //api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        //api/Users/2
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            User user = await _context.Users.Where(u => u.UserId == id).SingleOrDefaultAsync();

            if (user == null)
                return StatusCode(404, "User not found");

            return user;
        }

        // api/Users
        [HttpPost]
        public async Task<Create.UserData> Post(Create.UserData userData)
        {
            Create create = new Create(_context);
            return await create.handle(userData);
        }

        //api/Users
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            User user = await _context.Users.Where(u => u.UserId == id).SingleOrDefaultAsync();

            if (user == null)
                return StatusCode(404, "User not found");

            _context.Users.Remove(user);
            return StatusCode(200, "User has been deleted");
        }

        // api/Login
        [HttpPost("login")]
        public async Task<Login.AuthenticatedUser> Login(Login.LoginData loginData)
        {
            return await _mediator.Send(loginData);
        }
    }
}