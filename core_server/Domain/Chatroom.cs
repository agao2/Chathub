using System.ComponentModel.DataAnnotations;

namespace core_server.Domain
{
    public class Chatroom
    {

        [Key]
        [Required]
        public int ID { get; set; }

        public string Name { get; set; }

    }

    public class ChatroomDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}