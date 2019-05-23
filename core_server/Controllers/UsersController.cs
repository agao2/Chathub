using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using core_server.Domain;
using Microsoft.EntityFrameworkCore;

namespace core_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
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
    }
}