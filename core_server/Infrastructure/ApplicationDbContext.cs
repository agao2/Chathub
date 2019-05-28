using Microsoft.EntityFrameworkCore;
using core_server.Domain;

namespace core_server.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Chatroom> Chatrooms { get; set; }
        public DbSet<ChatroomMemberships> ChatroomMemberships { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region  user seed
            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = 1,
                Username = "alex",
                EmailAddress = "alex@fake.com",
                Password = "password",
                PasswordSalt = "password_salt",
                DateCreated = "3/17/2019"
            });
            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = 2,
                Username = "rob",
                EmailAddress = "rob@ss.com",
                Password = "password",
                PasswordSalt = "password_salt",
                DateCreated = "3/17/2019"
            });
            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = 3,
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