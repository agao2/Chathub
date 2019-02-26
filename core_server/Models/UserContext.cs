using Microsoft.EntityFrameworkCore;

namespace core_server.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
        public DbSet<User> Users {get;set;}
    }
}