using System.Linq;
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
            // Sorting
            source = source.OrderBy($"{options.SortBy} {options.SortDirection.ToLower()}");

            // Paging
            source = source
                .Skip((options.Page - 1) * options.ItemsPerPage)
                .Take(options.ItemsPerPage);

            return source;
        }
    }
}
