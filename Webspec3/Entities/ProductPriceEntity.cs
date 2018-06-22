using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    /// <summary>
    /// Model representing a product price within the database
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ProductPriceEntity : EntityBase
    {
        /// <summary>
        /// Currency id
        /// </summary>
        [Required]
        [Column("currency_id")]
        public string CurrencyId { get; set; }

        public CurrencyEntity Currency { get; set; }

        /// <summary>
        /// Price
        /// </summary>
        [Required]
        [Column("price")]
        public decimal Price { get; set; }

        /// <summary>
        /// Product id
        /// </summary>
        [Required]
        [Column("product_id")]
        public Guid ProductId { get; set; }

        public ProductEntity Product { get; set; }
    }
}
