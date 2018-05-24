using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.DynamicLinq;
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

        /// <summary>
        /// Implementation of <see cref="IImageService"/>
        /// </summary>
        /// <param name="dbContext">Database Context</param>
        public ImageService(WebSpecDbContext dbContext)
        {
            this.dbContext = dbContext;
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

        public async Task DeleteAsync(ImageEntity entity)
        {
            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                dbContext.Images.Remove(entity);

                await dbContext.SaveChangesAsync();
                transaction.Commit();
            }
        }

        public async Task<bool> ImageIdExistsAsync(Guid id)
        {
            return await dbContext.Images
                       .Where(x => x.Id.Equals(id))
                       .CountAsync() > 0;
        }
    }
}