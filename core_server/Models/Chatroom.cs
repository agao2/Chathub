using System.ComponentModel.DataAnnotations;

namespace core_server.Models
{
    public class Chatroom
    {

        [Key]
        [Required]
        public int ID { get; set; }

        public string Name { get; set; }

    }
}