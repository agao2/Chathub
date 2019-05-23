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

namespace core_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public UsersController(ApplicationDbContext context, IJwtTokenGenerator JwtTokenGenerator)
        {
            _context = context;
            _jwtTokenGenerator = JwtTokenGenerator;
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
            User user = await _context.Users.Where(u => u.ID == id).SingleOrDefaultAsync();

            if (user == null)
                return StatusCode(404, "User not found");

            return user;
        }

        //api/Users
        [HttpPost]
        public async Task<ActionResult<UserDTO>> Post(UserDTO userDTO)
        {
            await _context.Users.AddAsync(
                new User
                {
                    Username = userDTO.Username,
                    EmailAddress = userDTO.EmailAddress,
                    Password = userDTO.Password,
                    DateCreated = DateTime.Now.ToString(),
                    PasswordSalt = "salt"
                }
            );
            _context.SaveChanges();
            return userDTO;
        }

        //api/Users
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            User user = await _context.Users.Where(u => u.ID == id).SingleOrDefaultAsync();

            if (user == null)
                return StatusCode(404, "User not found");

            _context.Users.Remove(user);
            return StatusCode(200, "User has been deleted");
        }

        //api/Login
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login (Authentication authentication) {

            User user = _context.Users.Where(u => u.Username == authentication.Username).SingleOrDefault();

            if (user == null)
                return StatusCode(403,"User does not exist");

            if (!user.Password.Equals(authentication.Password))
                return StatusCode(403,"Password or username does not match");

            HttpContext.Session.SetString("test","test");

            return new UserDTO
            {
                Username = user.Username,
                EmailAddress = user.EmailAddress,
                Password = user.Password,
                DateCreated = user.DateCreated,
                Token = await _jwtTokenGenerator.CreateToken(user.Username)
            };

        }
    }
}