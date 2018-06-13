using System;
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
        [Required(AllowEmptyStrings = false, ErrorMessage = "The parameter sort by is required.")]
        [RegularExpression("^.*(Artist|Label|ReleaseDate)$", ErrorMessage = "The parameter sort by must match one of 'Artist', 'Label', 'ReleaseDate'")]
        public override string SortBy { get; set; } = "Artist";

        [RegularExpression("^.*(Artist|Label|ReleaseDate|Description|DescriptionShort|Title)$", ErrorMessage = "The parameter filter by must match one of 'Artist', 'Label', 'ReleaseDate', 'Description', 'DescriptionShort' and 'Title'")]
        public override string FilterBy { get; set; }

        /// <summary>
        /// Specifies an optional category id. Products will be pre-filtered by this id before applying the other filters
        /// </summary>
        public Guid? FilterByCategory { get; set; }
    }
}
