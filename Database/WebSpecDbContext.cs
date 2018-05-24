using Microsoft.EntityFrameworkCore;
using webspec3.Entities;

namespace webspec3.Database
{
    /// <summary>
    /// M. Narr
    /// </summary>
    public sealed class WebSpecDbContext : DbContext
    {
        public DbSet<LanguageEntity> Languages { get; set; }

        public DbSet<CurrencyEntity> Currencies { get; set; }


        public DbSet<ProductEntity> Products { get; set; }

        public DbSet<ProductPriceEntity> ProductPrices { get; set; }

        public DbSet<ProductTranslationEntity> ProductTranslations { get; set; }

        public DbQuery<ConsolidatedProductEntity> ProductsConsolidated { get; set; }

        public DbSet<ImageEntity> Images { get; set; }

        public DbSet<UserEntity> Users { get; set; }

        public WebSpecDbContext(DbContextOptions<WebSpecDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Misc
            modelBuilder
                .Entity<LanguageEntity>()
                .ToTable("languages");

            modelBuilder
                .Entity<CurrencyEntity>()
                .ToTable("currency");


            // Products
            modelBuilder
                .Entity<ProductEntity>()
                .ToTable("products");

            modelBuilder
                .Entity<ProductPriceEntity>()
                .ToTable("product_prices");

            modelBuilder
                .Entity<ProductTranslationEntity>()
                .ToTable("product_translations");

            modelBuilder
                .Query<ConsolidatedProductEntity>()
                .ToView("products_consolidated");

            modelBuilder
                .Entity<ImageEntity>()
                .ToTable("products_images");

            // Users
            modelBuilder
                .Entity<UserEntity>()
                .ToTable("users");
        }
    }
}