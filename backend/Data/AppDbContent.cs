using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Field> Field { get; set; }
        public DbSet<Map> Map { get; set; }
        public DbSet<Insight> Insight { get; set; }
    }
}
