using System.ComponentModel.DataAnnotations;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Class representing an product image create/update request
    /// 
    /// M. Narr
    /// </summary>
    public abstract class ApiV1ProductImageCreateUpdateRequestModelBase
    {
        /// <summary>
        /// Image description
        /// </summary>
        [Required]
        public string Description { get; set; }

        /// <summary>
        /// Image data base64-encoded
        /// </summary>
        [Required]
        public string Base64String { get; set; }

        /// <summary>
        /// Image type
        /// </summary>
        [Required]
        [RegularExpression("(png)|(jpg)|(jpeg)")]
        public string ImageType { get; set; }
    }
}
