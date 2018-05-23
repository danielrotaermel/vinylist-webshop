using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webspec3.Core.HelperClasses;
using webspec3.Database;
using webspec3.Entities;
using webspec3.Extensions;

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
                // Remove all prices
                dbContext.ProductPrices.RemoveRange(dbContext.ProductPrices.Where(x => x.ProductId == entityId));

                // Remove all translations
                dbContext.ProductTranslations.RemoveRange(dbContext.ProductTranslations.Where(x => x.ProductId == entityId));

                dbContext.Products.Remove(await dbContext.Products.FindAsync(entityId));

                await dbContext.SaveChangesAsync();

                transaction.Commit();
            }

            logger.LogInformation($"Sucessfully removed product with id {entityId}");
        }

        public async Task<List<ProductEntity>> GetPagedAsync(PagingSortingParams options)
        {
            logger.LogDebug($"Attempting to retrieve products from database: Page: {options.Page}, items per page: {options.ItemsPerPage}, sort by: {options.SortBy}, sort direction: {options.SortDirection}.");

            var products = await dbContext.Products
                .PagedAndSorted(options)
                .ToListAsync();

            logger.LogInformation($"Retrieved {products.Count} products from the database.");

            return products;
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

            foreach (var priceEntity in entity.Prices)
            {
                // Check if currency is supported
                if (!i18nService.SupportedCurrencies.Any(x => x.Code == priceEntity.CurrencyId))
                {
                    throw new ArgumentException($"Currency {priceEntity.CurrencyId} is not supported.");
                }
            }

            foreach (var translationEntity in entity.Translations)
            {
                // Check if language is supported
                if (!i18nService.SupportedLanguages.Any(x => x.Code == translationEntity.LanguageId))
                {
                    throw new ArgumentException($"Language {translationEntity.LanguageId} is not supported.");
                }
            }

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                // Remove all previous prices and translations
                dbContext.ProductPrices.RemoveRange(dbContext.ProductPrices.Where(x => x.ProductId == entity.Id));
                dbContext.ProductTranslations.RemoveRange(dbContext.ProductTranslations.Where(x => x.ProductId == entity.Id));

                // Add new prices
                entity.Prices.ForEach(x =>
                {
                    x.ProductId = entity.Id;
                    dbContext.ProductPrices.Add(x);
                });

                // Add new translations
                entity.Translations.ForEach(x =>
                {
                    x.ProductId = entity.Id;
                    dbContext.ProductTranslations.Add(x);
                });

                await dbContext.SaveChangesAsync();

                transaction.Commit();
            }
        }

        public async Task<List<ConsolidatedProductEntity>> GetAllConsolidatedAsync()
        {
            logger.LogDebug($"Attempting to retrieve all available products consolidated from the database.");

            var products = await dbContext.ProductsConsolidated
                .Where(x => x.Language == i18nService.GetCurrentLanguage().Code && x.Currency == i18nService.GetCurrentCurrency().Code)
                .OrderBy(x => x.Title)
                .ToListAsync();

            logger.LogInformation($"Retrieved {products.Count} products from the database.");

            return products;
        }

        public async Task<List<ConsolidatedProductEntity>> GetConsolidatedPagedAsync(PagingSortingParams options)
        {
            logger.LogDebug($"Attempting to retrieve products consolidated from database: Page: {options.Page}, items per page: {options.ItemsPerPage}, sort by: {options.SortBy}, sort direction: {options.SortDirection}.");

            var products = await dbContext.ProductsConsolidated
                .Where(x => x.Language == i18nService.GetCurrentLanguage().Code && x.Currency == i18nService.GetCurrentCurrency().Code)
                .PagedAndSorted(options)
                .ToListAsync();

            logger.LogInformation($"Retrieved {products.Count} products from the database.");

            return products;
        }

        public async Task<ConsolidatedProductEntity> GetConsolidatedByIdAsync(Guid id)
        {
            logger.LogDebug($"Attempting to retrieve the consolidated product with id {id}.");

            var product = await dbContext.ProductsConsolidated
                .Where(x => x.Id == id)
                .Where(x => x.Language == i18nService.GetCurrentLanguage().Code && x.Currency == i18nService.GetCurrentCurrency().Code)
                .FirstOrDefaultAsync();

            return product;
        }

        public async Task<List<ProductEntity>> GetAllAsync()
        {
            logger.LogDebug($"Attempting to retrieve all available products from the database.");

            var products = await dbContext.Products
                .OrderBy(x => x.Artist)
                .ToListAsync();

            logger.LogInformation($"Retrieved {products.Count} products from the database.");

            return products;
        }
    }
}