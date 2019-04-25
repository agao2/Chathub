using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using core_server.Models;
using StackExchange.Redis;

namespace core_server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly UserContext _context;
        private IConnectionMultiplexer _connectionMultiplexer;
        public AuthenticationController(UserContext context,IConnectionMultiplexer multiplexer)
        {
            _context = context;
            this._connectionMultiplexer = multiplexer;
        }

        [HttpPost]
        public ActionResult<UserDTO> Post(Authentication authentication)
        {
            User user = _context.Users.Where(u => u.Username == authentication.Username).SingleOrDefault();

            if (user == null)
                return StatusCode(403,"User does not exist");

            if (!user.Password.Equals(authentication.Password))
                return StatusCode(403,"Password or username does not match");

            return new UserDTO
            {
                Username = user.Username,
                EmailAddress = user.EmailAddress,
                Password = user.Password,
                DateCreated = user.DateCreated
            };

        }

    }
}