using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    /// <summary>
    /// Model representing a product translation within the webshop
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ProductTranslationEntity : EntityBase
    {
        /// <summary>
        /// Product description
        /// </summary>
        [Column("description")]
        public string Description { get; set; }

        /// <summary>
        /// Product short description
        /// </summary>
        [Column("description_short")]
        public string DescriptionShort { get; set; }

        /// <summary>
        /// Language id
        /// </summary>
        [Column("language_id")]
        public string LanguageId { get; set; }

        public LanguageEntity Language { get; set; }

        /// <summary>
        /// Product id
        /// </summary>
        [Column("product_id")]
        public Guid ProductId { get; set; }

        public ProductEntity Product { get; set; }

        /// <summary>
        /// Product title
        /// </summary>
        [Column("title")]
        public string Title { get; set; }
    }
}
