using System;
using System.Threading.Tasks;
using webspec3.Entities;

namespace webspec3.Services
{
    /// <summary>
    /// Basic interface for an entity service
    /// 
    /// M. Narr
    /// </summary>
    /// <typeparam name="T">Must extend from <see cref="EntityBase"/></typeparam>
    public interface IEntityService<T> where T : EntityBase
    {
        /// <summary>
        /// Adds the specified entity
        /// </summary>
        /// <param name="entity">Instance of <typeparamref name="T"/></param>
        /// <returns>Awaitable <see cref="Task"/></returns>
        Task AddAsync(T entity);

        /// <summary>
        /// Deletes the specified entity
        /// </summary>
        /// <param name="entity">Instance of <typeparamref name="T"/></param>
        /// <returns>Awaitable <see cref="Task"/></returns>
        Task DeleteAsync(T entity);

        /// <summary>
        /// Deletes the entity with the specified id
        /// </summary>
        /// <param name="entityId">Entity id</param>
        /// <returns>Awaitable <see cref="Task"/></returns>
        Task DeleteAsync(Guid entityId);

        /// <summary>
        /// Updates the entity
        /// </summary>
        /// <param name="entity">Instance of <typeparamref name="T"/></param>
        /// <returns>Awaitable <see cref="Task"/></returns>
        Task UpdateAsync(T entity);

        /// <summary>
        /// Retrieves the entity with the specified id. Returns null if no such entity exists
        /// </summary>
        /// <param name="entityId">Entity id</param>
        /// <returns>Awaitable <see cref="Task"/></returns>
        Task<T> GetByIdAsync(Guid entityId);
    }
}
