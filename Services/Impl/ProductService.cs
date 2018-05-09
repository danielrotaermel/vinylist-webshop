using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webspec3.Database;
using webspec3.Entities;

namespace webspec3.Services.Impl
{
    /// <summary>
    /// Implementation of <see cref="IProductService"/>
    /// 
    /// M. Narr, J. Mauthe
    /// </summary>
    public sealed class ProductService : IProductService
    {
        private readonly WebSpecDbContext dbContext;
        private readonly II18nService i18nService;
        private readonly ILogger logger;

        public ProductService(WebSpecDbContext dbContext, II18nService i18nService, ILogger<ProductService> logger)
        {
            this.dbContext = dbContext;
            this.i18nService = i18nService;
            this.logger = logger;
        }

        public Task AddAsync(ProductEntity entity)
        {
            throw new NotSupportedException($"Method AddAsync(ProductEntity) is not supported in ProductService.");
        }

        public async Task AddAsync(ProductEntity entity, List<ProductPriceEntity> priceEntities,
            List<ProductTranslationEntity> translationEntities)
        {
            logger.LogDebug($"Attempting to add new product");

            // Check if all provided currencies are supported
            // Later todo: Fetch from DB
            foreach (var priceEntity in priceEntities)
            {
                if (!i18nService.SupportedCurrencies.Any(x => x.Code == priceEntity.CurrencyId))
                {
                    throw new ArgumentException($"Currency {priceEntity.CurrencyId} is not supported.");
                }
            }

            // Check if all provided translations are supported
            // Later todo: Fetch from DB
            foreach (var translationEntity in translationEntities)
            {
                if (!i18nService.SupportedLanguages.Any(x => x.Code == translationEntity.LanguageId))
                {
                    throw new ArgumentException($"Language {translationEntity.LanguageId} is not supported.");
                }
            }

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                // Persist ProductEntity first
                dbContext.Products.Add(entity);

                await dbContext.SaveChangesAsync();

                // Persist price entities
                priceEntities.ForEach(x => x.ProductId = entity.Id);
                dbContext.ProductPrices.AddRange(priceEntities);

                // Persist translation entities
                translationEntities.ForEach(x => x.ProductId = entity.Id);
                dbContext.ProductTranslations.AddRange(translationEntities);

                await dbContext.SaveChangesAsync();

                transaction.Commit();
            }
        }

        public async Task DeleteAsync(ProductEntity entity)
        {
            await DeleteAsync(entity.Id);
        }

        public async Task DeleteAsync(Guid entityId)
        {
            logger.LogDebug($"Attempting to remove product with id {entityId}");

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                dbContext.ProductPrices.RemoveRange(dbContext.ProductPrices.Where(x => x.ProductId == entityId));
                dbContext.ProductTranslations.RemoveRange(
                    dbContext.ProductTranslations.Where(x => x.ProductId == entityId));

                dbContext.Products.Remove(await dbContext.Products.FindAsync(entityId));

                await dbContext.SaveChangesAsync();

                transaction.Commit();
            }

            logger.LogInformation($"Sucessfully removed product with id {entityId}");
        }

        public async Task<ProductEntity> GetByIdAsync(Guid entityId)
        {
            logger.LogDebug($"Attempting to retrieve the product with the id {entityId}");

            var product = await dbContext.Products
                .Where(x => x.Id == entityId)
                .FirstOrDefaultAsync();

            return product;
        }


        public async Task UpdateAsync(ProductEntity entity)
        {
            logger.LogDebug($"Attempting to update product with id {entity.Id}");

            var products = await dbContext.Products
                .Where(x => x.Id == entity.Id)
                .ToListAsync();

            if (products.Count == 0)
            {
                throw new ArgumentException($"Product with id {entity.Id} is not available");
            }
            
            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                dbContext.Products.Update(entity);
                await dbContext.SaveChangesAsync();

                transaction.Commit();
            }
        }

        public async Task<List<ConsolidatedProductEntity>> GetAllConsolidated()
        {
            logger.LogDebug($"Attempting to retrieve all available products consolidated from the database.");

            var products = await dbContext.ProductsConsolidated
                .Where(x => x.Language == i18nService.GetCurrentLanguage().Code && x.Currency == i18nService.GetCurrentCurrency().Code)
                .OrderBy(x => x.Title)
                .ToListAsync();

            logger.LogInformation($"Retrieved {products.Count} products from the database.");

            return products;
        }

        public async Task<ConsolidatedProductEntity> GetConsolidatedById(Guid id)
        {
            logger.LogDebug($"Attempting to retrieve the consolidated product with id {id}.");

            var product = await dbContext.ProductsConsolidated
                .Where(x => x.Id == id)
                .Where(x => x.Language == i18nService.GetCurrentLanguage().Code && x.Currency == i18nService.GetCurrentCurrency().Code)
                .FirstOrDefaultAsync();

            return product;
        }
    }
}