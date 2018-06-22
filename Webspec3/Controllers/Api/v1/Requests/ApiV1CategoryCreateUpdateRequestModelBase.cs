using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a category create/update request
    /// 
    /// M. Narr
    /// </summary>
    public abstract class ApiV1CategoryCreateUpdateRequestModelBase
    {
        /// <summary>
        /// Category title
        /// </summary>
        [Required(ErrorMessage = "A category title must be provided", AllowEmptyStrings = false)]
        public string Title { get; set; }
    }
}
