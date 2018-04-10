using Microsoft.EntityFrameworkCore;

namespace webspec3.Database
{
    /// <summary>
    /// M. Narr
    /// </summary>
    public sealed class WebSpecDbContext : DbContext
    {
        public WebSpecDbContext(DbContextOptions<WebSpecDbContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
