using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a user update request
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1UserUpdateRequestModel : ApiV1UserCreateUpdateRequestModelBase
    {
        /// <summary>
        /// User's password
        /// </summary>
        [StringLength(255, MinimumLength = 4, ErrorMessage = "The password must be of length between 4 and 255.")]
        public string Password { get; set; }
    }
}
