using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a login request
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1LoginRequestModel
    {
        /// <summary>
        /// The user's email
        /// </summary>
        [EmailAddress]
        [Required(AllowEmptyStrings = false, ErrorMessage = "An email must be supplied")]
        public string EMail { get; set; }

        /// <summary>
        /// The user's password
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "A password must be supplied")]
        public string Password { get; set; }
    }
}
