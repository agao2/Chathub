using System.ComponentModel.DataAnnotations;

namespace core_server.Models
{
    public class User
    {
        [Key]
        [Required]
        public int ID { get; set; }
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

    public class UserDTO
    {
        public string Username{get;set;}
        public string EmailAddress{get;set;}
        public string Password {get;set;}
        public string DateCreated{get;set;}
    }
}