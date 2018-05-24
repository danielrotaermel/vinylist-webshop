using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    /// <summary>
    /// Represents an Image of a product
    /// 
    /// J. Mauthe
    /// </summary>
    public sealed class ImageEntity
    {
        /// <summary>
        /// Image id
        /// </summary>
        [Column("id")]
        public Guid Id { get; set; }

        /// <summary>
        /// Description of the image
        /// </summary>
        [Column("description")]
        [Required] 
        public string Description { get; set; }

        /// <summary>
        /// Base64 representation of the image
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [Column("base_64_string")]
        public string Base64String { get; set; }

        /// <summary>
        /// The type of the image. (Must be png or jpg)
        /// </summary>
        [Required]
        [RegularExpression("(png|jpg)")]
        [Column("image_type")]
        public string ImageType { get; set; }
    }
}