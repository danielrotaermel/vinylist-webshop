using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    /// <summary>
    /// Model representing a product within the webshop
    /// 
    /// M. Narr, J.Mauthe
    /// </summary>
    public sealed class ProductEntity : EntityBase
    {
        /// <summary>
        /// Product artist
        /// </summary>
        [Column("artist")]
        public string Artist { get; set; }

        /// <summary>
        /// Product label
        /// </summary>
        [Column("label")]
        public string Label { get; set; }

        /// <summary>
        /// Product release date
        /// </summary>
        [Column("release_date")]
        public DateTime ReleaseDate { get; set; }

        /// <summary>
        /// Product category id
        /// </summary>
        [Column("category_id")]
        public Guid CategoryId { get; set; }

        /// <summary>
        /// Product image
        /// </summary>
        [Column("image")]
        public ImageEntity Image { get; set; }

        public ProductCategory Category { get; set; }

        public List<ProductPriceEntity> Prices { get; set; }

        public List<ProductTranslationEntity> Translations { get; set; }
    }
}