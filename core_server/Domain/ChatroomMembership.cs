using System.ComponentModel.DataAnnotations;

namespace core_server.Domain
{
    public class ChatroomMemberships
    {

        [Key]
        [Required]
        public int ChatroomMembershipId { get; set; }

        public User User { get; set; }

        public Chatroom Chatroom { get; set; }

    }
}