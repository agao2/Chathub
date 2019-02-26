namespace core_server.Models
{
    public class User
    {
        public int ID {get;set;}
        public string Username {get;set;}
        public string EmailAddress{get;set;}
        public string Password {get;set;}
        public string PasswordSalt {get;set;}
        public string DateCreated {get;set;}
    }
}