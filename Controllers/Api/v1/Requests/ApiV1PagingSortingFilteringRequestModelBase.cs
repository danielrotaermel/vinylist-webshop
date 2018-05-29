using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a paged request
    /// 
    /// M. Narr
    /// </summary>
    public abstract class ApiV1PagingSortingFilteringRequestModelBase
    {
        /// <summary>
        /// Specifies how many items should be returned per page
        /// </summary>
        [Range(5, 50)]
        public int ItemsPerPage { get; set; } = 10;

        /// <summary>
        /// Specifies the sorting column
        /// </summary>
        public abstract string SortBy { get; set; }

        /// <summary>
        /// Specifies the sorting direction
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [RegularExpression("(ASC|DESC)")]
        public string SortDirection { get; set; } = "ASC";

        /// <summary>
        /// Specifies the filter column
        /// </summary>
        public abstract string FilterBy { get; set; }

        /// <summary>
        /// Specifies the filter string
        /// </summary>
        public string FilterQuery { get; set; }
    }
}
