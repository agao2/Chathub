using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using core_server.Models;
using StackExchange.Redis;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace core_server.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class ChatroomsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChatroomsController(ApplicationDbContext context)
        {
            _context = context;
        }

        //api/Chatroom
        [HttpGet]
        public async Task<IEnumerable<Chatroom>> Get()
        {
            return await _context.Chatrooms.ToListAsync();
        }

        //api/Chatrooms/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Chatroom>> Get(int id)
        {
            Chatroom chatroom = await _context.Chatrooms.Where(u => u.ID == id).SingleOrDefaultAsync();

            if (chatroom == null)
                return NotFound("Chatroom not found");

            return chatroom;
        }

        //api/Chatrooms
        [HttpPost]

        public async Task<ActionResult<ChatroomDTO>> Post(ChatroomDTO chatroomDTO)
        {
            await _context.Chatrooms.AddAsync(
                new Chatroom
                {
                    Name = chatroomDTO.Name
                }
            );
            await _context.SaveChangesAsync();
            return chatroomDTO;
        }

        //api/Chatrooms
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            Chatroom chatroom = await _context.Chatrooms.Where(u => u.ID == id).SingleOrDefaultAsync();

            if (chatroom == null)
                return StatusCode(403, "Chatroom does not exist");

            _context.Chatrooms.Remove(chatroom);
            return StatusCode(200, "Chatroom has been deleted");

        }



    }
}