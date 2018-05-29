using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a paged product request
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1ProductPagingSortingFilteringRequestModel : ApiV1PagingSortingFilteringRequestModelBase
    {
        [Required(AllowEmptyStrings = false)]
        [RegularExpression("(Artist|Label|ReleaseDate)")]
        public override string SortBy { get; set; }

        [RegularExpression("(Artist|Label|ReleaseDate)")]
        public override string FilterBy { get; set; }
    }
}
