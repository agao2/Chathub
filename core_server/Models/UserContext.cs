using Microsoft.EntityFrameworkCore;

namespace core_server.Models
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users {get;set;}
        public UserContext(DbContextOptions<UserContext> options) : base(options){}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            #region  user seed
            modelBuilder.Entity<User>().HasData(new User{
                ID=1,
                Username = "alex",
                EmailAddress = "alex@fake.com",
                Password = "password",
                PasswordSalt = "password_salt",
                DateCreated = "3/17/2019"
            });
            #endregion
        }
    }
}