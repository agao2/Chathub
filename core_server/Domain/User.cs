using System.ComponentModel.DataAnnotations;

namespace core_server.Domain
{
    public class User
    {
        [Key]
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PasswordSalt { get; set; }
        [Required]
        public string DateCreated { get; set; }
    }
}