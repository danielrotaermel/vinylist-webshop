using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.DynamicLinq;
using Microsoft.Extensions.Logging;
using webspec3.Database;
using webspec3.Entities;

namespace webspec3.Services.Impl
{
    /// <summary>
    /// Image Service providing access to the images in the database
    /// 
    /// J. Mauthe
    /// </summary>
    public sealed class ImageService : IImageService
    {
        private readonly WebSpecDbContext dbContext;

        private readonly ILogger logger;

        /// <summary>
        /// Implementation of <see cref="IImageService"/>
        /// </summary>
        /// <param name="dbContext">Database Context</param>
        public ImageService(WebSpecDbContext dbContext, ILogger<ImageService> logger)
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        public async Task AddAsync(ImageEntity entity)
        {
            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                await dbContext.Images.AddAsync(entity);
                await dbContext.SaveChangesAsync();
                transaction.Commit();
            }
        }

        public async Task<ImageEntity> GetByIdAsync(Guid imageId)
        {
            return await dbContext.Images
                .Where(x => x.Id.Equals(imageId))
                .FirstOrDefaultAsync();
        }

        public async Task DeleteAsync(Guid imageId)
        {
            logger.LogDebug($"Attempting to remove Image with id with id {imageId}");

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
               dbContext.Images.Remove(await dbContext.Images.FindAsync(imageId));

                await dbContext.SaveChangesAsync();

                transaction.Commit();
            }

            logger.LogInformation($"Sucessfully removed Image with id {imageId}");
        }

        public async Task UpdateAsync(ImageEntity entity)
        {
            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                dbContext.Images.Update(entity);

                await dbContext.SaveChangesAsync();

                transaction.Commit();
            }
        }
    }
}