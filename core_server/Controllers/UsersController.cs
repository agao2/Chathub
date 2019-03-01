using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using core_server.Models;


namespace core_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        //api/Users
        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            return _context.Users.ToArray();
        }

        //api/Users/2
        [HttpGet("{id}")]
        public ActionResult<User> Get( int id){
            User user = _context.Users.Where( u => u.ID == id).SingleOrDefault();

            if(user == null)
                return NotFound("User Not Found");
            
            return user;
        }   

        //api/Users
        [HttpPost]
        public ActionResult<UserDTO> Post (UserDTO userDTO)
        {
            _context.Users.Add(new User{
                Username = userDTO.Username,
                EmailAddress = userDTO.EmailAddress,
                Password = userDTO.Password,
                DateCreated = DateTime.Now.ToString(),
                PasswordSalt = "salt"
            });
            _context.SaveChanges();
            return userDTO;
        }
    }
}