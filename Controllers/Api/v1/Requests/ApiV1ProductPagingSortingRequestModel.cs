using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a paged product request
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1ProductPagingSortingRequestModel : ApiV1PagingSortingRequestModelBase
    {
        [Required(AllowEmptyStrings = false)]
        [RegularExpression("(Artist|Description|DescriptionShort|Label|Price|ReleaseDate|Title)")]
        public override string SortBy { get; set; }
    }
}
