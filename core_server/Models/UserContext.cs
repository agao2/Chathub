using Microsoft.EntityFrameworkCore;

namespace core_server.Models
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Chatroom> Chatrooms { get; set; }
        public DbSet<ChatroomMemberships> ChatroomMemberships { get; set; }
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region  user seed
            modelBuilder.Entity<User>().HasData(new User
            {
                ID = 1,
                Username = "alex",
                EmailAddress = "alex@fake.com",
                Password = "password",
                PasswordSalt = "password_salt",
                DateCreated = "3/17/2019"
            });
            modelBuilder.Entity<User>().HasData(new User
            {
                ID = 2,
                Username = "rob",
                EmailAddress = "rob@ss.com",
                Password = "password",
                PasswordSalt = "password_salt",
                DateCreated = "3/17/2019"
            });
            modelBuilder.Entity<User>().HasData(new User
            {
                ID = 3,
                Username = "lisa",
                EmailAddress = "ll@fake.com",
                Password = "password",
                PasswordSalt = "password_salt",
                DateCreated = "3/17/2019"
            });
            #endregion
        }
    }
}