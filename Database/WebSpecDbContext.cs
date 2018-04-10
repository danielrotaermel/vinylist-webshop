using Microsoft.EntityFrameworkCore;
using webspec3.Entities;

namespace webspec3.Database
{
    /// <summary>
    /// M. Narr
    /// </summary>
    public sealed class WebSpecDbContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }

        public WebSpecDbContext(DbContextOptions<WebSpecDbContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<UserEntity>()
                .ToTable("users");
        }
    }
}
