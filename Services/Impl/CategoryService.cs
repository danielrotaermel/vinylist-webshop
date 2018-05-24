using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webspec3.Database;
using webspec3.Entities;

namespace webspec3.Services.Impl
{
    /// <summary>
    /// Implementation of <see cref="ICategoryService"/>
    /// 
    /// M. Narr
    /// </summary>
    public sealed class CategoryService : EntityServiceBase<CategoryEntity>, ICategoryService
    {
        private const string entityName = "category";

        public CategoryService(WebSpecDbContext dbContext, ILogger<CategoryService> logger) : base(dbContext, dbContext.Categories, logger, entityName)
        {

        }

        public bool DoesCategoryNameExist(string categoryName)
        {
            logger.LogDebug($"Checking whether a category with id {categoryName} exists already.");

            var exists = dbContext.Categories.Any(x => x.Title.ToLower() == categoryName.ToLower());

            logger.LogInformation($"A category with name {categoryName} does already exist: {exists}");

            return exists;
        }

        public async Task<List<(CategoryEntity categoryEntity, int productCount)>> GetAllAsync()
        {
            logger.LogDebug($"Attempting to retrieve all categories from the database.");

            var categories = dbContext.Categories
                .Include(x => x.Products)
                .OrderBy(x => x.Title)
                .AsEnumerable()
                .Select(x => (x, x.Products.Count))
                .ToList();

            logger.LogInformation($"Received {categories.Count} categories from the database.");

            return categories;
        }
    }
}
