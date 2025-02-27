﻿using System.Linq;
using System.Linq.Dynamic.Core;
using webspec3.Core.HelperClasses;

namespace webspec3.Extensions
{
    /// <summary>
    /// Extensions regarding <see cref="IQueryable"/>
    /// 
    /// M. Narr
    /// </summary>
    public static class IQueryableExtensions
    {
        /// <summary>
        /// Applies the specified sorting and paging options to the IQueryable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source">Source queryable</param>
        /// <param name="options">Instance of <see cref="PagingSortingParams"/></param>
        /// <returns>Modified source queryable</returns>
        public static IQueryable<T> PagedAndSorted<T>(this IQueryable<T> source, PagingSortingParams options)
        {
            if (options == null)
            {
                return source;
            }

            // Sorting
            source = source.OrderBy($"{options.SortBy} {options.SortDirection.ToLower()}");

            // Paging
            source = source
                .Skip((options.Page - 1) * options.ItemsPerPage)
                .Take(options.ItemsPerPage);

            return source;
        }

        /// <summary>
        /// Applies the specified filtering options to the IQueryable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source">Source queryable</param>
        /// <param name="options">Instance of <see cref="FilterParams"/></param>
        /// <returns>Modified source queryable</returns>
        public static IQueryable<T> Filtered<T>(this IQueryable<T> source, FilterParams options)
        {
            if (options == null || string.IsNullOrEmpty(options.FilterBy) || string.IsNullOrEmpty(options.FilterQuery))
            {
                return source;
            }

            source = source.Where($"{options.FilterBy}.ToLower().Contains(@0)", options.FilterQuery.ToLower());

            return source;
        }

        /// <summary>
        /// Applies the specified filtering options to the IQueryable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source">Source queryable</param>
        /// <param name="options">Instance of <see cref="FilterParams"/></param>
        /// <returns>Modified source queryable</returns>
        public static IQueryable<T> ProductsAdvancedFiltered<T>(this IQueryable<T> source, FilterParams options)
        {
            if (options == null || string.IsNullOrEmpty(options.FilterBy) || string.IsNullOrEmpty(options.FilterQuery))
            {
                return source;
            }

            switch (options.FilterBy)
            {
                case "Artist":
                case "Label":
                case "ReleaseDate":
                    source = source.Filtered(options);
                    break;
                case "Description":
                case "DescriptionShort":
                case "Title":
                    source = source.Where($"Translations.Any(LanguageId = @0) and Translations.Where(LanguageId = @0).First().{options.FilterBy}.ToLower().Contains(@1)", options.FilterLanguage, options.FilterQuery.ToLower());
                    break;
            }


            return source;
        }
    }
}
