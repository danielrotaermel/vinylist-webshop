using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    /// <summary>
    /// Model representing a language within the webshop
    /// 
    /// M. Narr
    /// </summary>
    public sealed class LanguageEntity
    {
        /// <summary>
        /// Language id, e.g. DEU
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Language title
        /// </summary>
        [Required]
        [Column("title")]
        public string Title { get; set; }
    }
}
