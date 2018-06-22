using System;
using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a category update request
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1CategoryUpdateRequestModel : ApiV1CategoryCreateUpdateRequestModelBase
    {
        /// <summary>
        /// Category id
        /// </summary>
        [Required(ErrorMessage = "A id of a category is required in order to update it")]
        public Guid Id { get; set; }
    }
}
