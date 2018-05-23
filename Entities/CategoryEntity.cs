using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    /// <summary>
    /// Represents a product category within the webshop
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ProductCategory : EntityBase
    {
        /// <summary>
        /// Category title
        /// </summary>
        [Column("title")]
        public string Title { get; set; }
    }
}
