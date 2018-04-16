using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a user create/update request
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1UserCreateUpdateRequestModel
    {
        /// <summary>
        /// User's first name
        /// </summary>
        [Required(ErrorMessage = "A first name is required.", AllowEmptyStrings = false)]
        public string FirstName { get; set; }

        /// <summary>
        /// User's last name
        /// </summary>
        [Required(ErrorMessage = "A last name is required.", AllowEmptyStrings = false)]
        public string LastName { get; set; }

        /// <summary>
        /// User's email
        /// </summary>
        [Required(ErrorMessage = "An email is required.", AllowEmptyStrings = false)]
        [EmailAddress(ErrorMessage = "The provided email address is not valid.")]
        public string Email { get; set; }

        /// <summary>
        /// User's password
        /// </summary>
        [Required(ErrorMessage = "A password is required.", AllowEmptyStrings = false)]
        [StringLength(255, MinimumLength = 4, ErrorMessage = "The password must be of length between 4 and 255.")]
        public string Password { get; set; }
    }
}
