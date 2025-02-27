﻿using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a user create request
    /// 
    /// M. Narr
    /// </summary>
    public abstract class ApiV1UserCreateUpdateRequestModelBase
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
        /// User's admin rights
        /// </summary>
        [Required(ErrorMessage = "Admin Rights must be set")]
        public bool IsAdmin { get; set; }
    }
}
