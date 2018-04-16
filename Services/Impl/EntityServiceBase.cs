using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using webspec3.Database;
using webspec3.Entities;

namespace webspec3.Services.Impl
{
    /// <summary>
    /// Base service which contains functions which are useful for all types of entities
    /// 
    /// M. Narr
    /// </summary>
    /// <typeparam name="T">Must extend from <see cref="EntityBase"/></typeparam>
    public abstract class EntityServiceBase<T> : IEntityService<T> where T : EntityBase
    {
        private readonly WebSpecDbContext dbContext;
        private readonly DbSet<T> entityDao;
        private readonly ILogger logger;
        private readonly string entityName;

        /// <summary>
        /// Creates a new instance of <see cref="EntityServiceBase{T}"/>
        /// </summary>
        /// <param name="dbContext">Instance of <see cref="WebSpecDbContext"/></param>
        /// <param name="entityDao">Instance of <see cref="DbSet{T}"/> which serves as DAO</param>
        /// <param name="logger">Instance of <see cref="ILogger"/></param>
        /// <param name="entityName">Name of the managed entity. Will appear in logs</param>
        public EntityServiceBase(WebSpecDbContext dbContext, DbSet<T> entityDao, ILogger<EntityServiceBase<T>> logger, string entityName)
        {
            this.dbContext = dbContext;
            this.entityDao = entityDao;
            this.logger = logger;
            this.entityName = entityName;
        }

        public async Task AddAsync(T entity)
        {
            logger.LogInformation($"Attempting to add new {entityName}.");

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                entityDao.Add(entity);

                await dbContext.SaveChangesAsync();
                transaction.Commit();
            }

            logger.LogInformation($"Successfully added {entityName} with id {entity.Id}.");
        }

        public async Task DeleteAsync(T entity)
        {
            logger.LogDebug($"Attempting to delete {entityName} with id {entity.Id}.");

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                entityDao.Remove(entity);

                await dbContext.SaveChangesAsync();
                transaction.Commit();
            }

            logger.LogInformation($"Successfully removed {entityName} with id {entity.Id}.");
        }

        public async Task DeleteAsync(Guid entityId)
        {
            await DeleteAsync(await GetByIdAsync(entityId));
        }

        public async Task<T> GetByIdAsync(Guid entityId)
        {
            logger.LogDebug($"Attempting to get {entityName} with id {entityId}.");

            return await entityDao
                .Where(x => x.Id == entityId)
                .FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            logger.LogDebug($"Attempting to update {entityName} with id {entity.Id}.");

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                entityDao.Update(entity);

                await dbContext.SaveChangesAsync();
                transaction.Commit();
            }

            logger.LogInformation($"Successfully updated {entityName} with id {entity.Id}.");
        }
    }
}
