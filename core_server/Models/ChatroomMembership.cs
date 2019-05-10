using System.ComponentModel.DataAnnotations;

namespace core_server.Models
{
    public class ChatroomMemberships
    {

        [Key]
        [Required]
        public int ID { get; set; }

        public User User { get; set; }

        public Chatroom Chatroom { get; set; }

    }
}