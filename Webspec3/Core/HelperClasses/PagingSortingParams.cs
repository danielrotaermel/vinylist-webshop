﻿namespace webspec3.Core.HelperClasses
{
    /// <summary>
    /// Core class to hold information about paging and sorting
    /// 
    /// M. Narr
    /// </summary>
    public sealed class PagingSortingParams
    {
        /// <summary>
        /// Requested page
        /// </summary>
        public int Page { get; set; } = 1;

        /// <summary>
        /// Requested items per page
        /// </summary>
        public int ItemsPerPage { get; set; } = 10;

        /// <summary>
        /// Requested sort column
        /// </summary>
        public string SortBy { get; set; }

        /// <summary>
        /// Requested sort direction
        /// </summary>
        public string SortDirection { get; set; }
    }
}
