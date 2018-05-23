using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    /// <summary>
    /// Model representing a currency within the webshop
    /// 
    /// M. Narr
    /// </summary>
    public sealed class CurrencyEntity
    {
        /// <summary>
        /// Currency id, e.g. EUR
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Currency title
        /// </summary>
        [Required]
        [Column("title")]
        public string Title { get; set; }
    }
}
