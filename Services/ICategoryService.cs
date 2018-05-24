﻿using System.Collections.Generic;
using System.Threading.Tasks;
using webspec3.Entities;

namespace webspec3.Services
{
    /// <summary>
    /// Interface regarding categories
    /// 
    /// M. Narr
    /// </summary>
    public interface ICategoryService : IEntityService<CategoryEntity>
    {
        /// <summary>
        /// Returns whether a category with the provided name does already exist
        /// </summary>
        /// <param name="categoryName">Category name</param>
        /// <returns>Boolean indicating whether a category with this name exists already.</returns>
        bool DoesCategoryNameExist(string categoryName);

        /// <summary>
        /// Returns a list of all categories associated with the count of products belonging to them
        /// </summary>
        /// <returns>List of all categories associated with the count of products belonging to them</returns>
        Task<List<(CategoryEntity categoryEntity, int productCount)>> GetAllAsync();
    }
}
