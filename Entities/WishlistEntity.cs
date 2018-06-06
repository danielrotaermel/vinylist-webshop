using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace webspec3.Entities
{
    /// <summary>
    /// This database entity represents an wishlist within the webshop
    /// 
    /// J. Mauthe
    /// </summary>
    public sealed class WishlistEntity
    {
        /// <summary>
        /// The user's Id
        /// </summary>
        [Required]
        [Column("user_id")]
        public Guid UserId{ get; set; }
        
        /// <summary>
        /// The product's Id
        /// </summary>
        [Required]
        [Column("product_id")]
        public Guid ProductId { get; set; }
        
        public ProductEntity Product{ get; set; }
    }
}