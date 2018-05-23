using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webspec3.Core.HelperClasses;
using webspec3.Entities;

namespace webspec3.Services
{
    /// <summary>
    /// Interface regaring products
    /// 
    /// M. Narr, J.Mauthe
    /// </summary>
    public interface IProductService : IEntityService<ProductEntity>
    {
        /// <summary>
        /// Adds a new product to the database
        /// </summary>
        /// <param name="entity">Instance of <see cref="ProductEntity"/> representing the basic product data</param>
        /// <param name="priceEntities">List of <see cref="ProductPriceEntity"/> representing available product prices</param>
        /// <param name="translationEntities">List of <see cref="ProductTranslationEntity"/> representing available product translations</param>
        /// <returns></returns>
        Task AddAsync(ProductEntity entity, List<ProductPriceEntity> priceEntities, List<ProductTranslationEntity> translationEntities);

        /// <summary>
        /// Returns a list of all available products consolidated into an instance of <see cref="ConsolidatedProductEntity"/>
        /// While consolidation, the currently selected currency and language is provided by an instance of <see cref="II18nService"/>
        /// </summary>
        /// <returns>List of all available products consolidated into an instance of <see cref="ConsolidatedProductEntity"/></returns>
        Task<List<ConsolidatedProductEntity>> GetAllConsolidatedAsync();

        /// <summary>
        /// Returns a paged list of all available products consolidated into an instance of <see cref="ConsolidatedProductEntity"/> while respecting the provided options
        /// While consilidation, the currently selected currency and language is provided by an instance of <see cref="II18nService"/>
        /// </summary>
        /// <param name="options">Instance of <see cref="PagingSortingParams"/></param>
        /// <returns>Paged list of available products consolidated into an instance of <see cref="ConsolidatedProductEntity"/></returns>
        Task<List<ConsolidatedProductEntity>> GetConsolidatedPagedAsync(PagingSortingParams options);

        /// <summary>
        /// Returns the product with the specified id consolidated into an instance of <see cref="ConsolidatedProductEntity"/>
        /// </summary>
        /// <param name="id">Product id</param>
        /// <returns>Product with the specified id consolidated into an instance of <see cref="ConsolidatedProductEntity"/></returns>
        Task<ConsolidatedProductEntity> GetConsolidatedByIdAsync(Guid id);
        
        /// <summary>
        /// Returns the product with the specified id/>
        /// </summary>
        /// <param name="id">Product id</param>
        /// <returns>Product with the specified id/></returns>
        Task<ProductEntity> GetByIdAsync(Guid id);

        /// <summary>
        /// Returns a list of all available products/>/>
        /// </summary>
        /// <returns>List of all available products/></returns>
        Task<List<ProductEntity>> GetAllAsync();

        /// <summary>
        /// Returns a paged list of all available products/>
        /// </summary>
        /// <param name="options">Instance of <see cref="PagingSortingParams"/></param>
        /// <returns>Paged list of available products/></returns>
        Task<List<ProductEntity>> GetPagedAsync(PagingSortingParams options);
    }
}
