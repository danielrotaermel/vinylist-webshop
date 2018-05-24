using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webspec3.Entities;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a product create/update request
    /// 
    /// M. Narr
    /// </summary>
    public abstract class ApiV1ProductCreateUpdateRequestModelBase
    {
        /// <summary>
        /// Product artist
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string Artist { get; set; }

        /// <summary>
        /// Product category's id
        /// </summary>
        [Required]
        public Guid CategoryId { get; set; }

        /// <summary>
        /// Product label
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string Label { get; set; }

        /// <summary>
        /// Product relase date
        /// </summary>
        [Required]
        public DateTime ReleaseDate { get; set; }

        /// <summary>
        /// Product image
        /// </summary>
        [Required]
        public ImageEntity Image{ get; set; }

        /// <summary>
        /// List of available prices
        /// </summary>
        public List<ApiV1ProductPriceModel> Prices { get; set; } = new List<ApiV1ProductPriceModel>();

        /// <summary>
        /// List of available translations
        /// </summary>
        public List<ApiV1ProductTranslationModel> Translations { get; set; } = new List<ApiV1ProductTranslationModel>();

        /// <summary>
        /// Child model to describe a product price
        /// </summary>
        public sealed class ApiV1ProductPriceModel
        {
            /// <summary>
            /// Price's associated currency
            /// </summary>
            [Required(AllowEmptyStrings = false)]
            public string CurrencyId { get; set; }

            /// <summary>
            /// Price itself
            /// </summary>
            [Required(AllowEmptyStrings = false)]
            public decimal Price { get; set; }
        }

        /// <summary>
        /// Child model to describe a product translation
        /// </summary>
        public sealed class ApiV1ProductTranslationModel
        {
            /// <summary>
            /// Product description
            /// </summary>
            [Required(AllowEmptyStrings = false)]
            public string Description { get; set; }

            /// <summary>
            /// Product short description
            /// </summary>
            [Required(AllowEmptyStrings = false)]
            public string DescriptionShort { get; set; }

            /// <summary>
            /// Product language id
            /// </summary>
            [Required(AllowEmptyStrings = false)]
            [StringLength(5, MinimumLength = 5)]
            public string LanguageId { get; set; }

            /// <summary>
            /// Product title
            /// </summary>
            [Required(AllowEmptyStrings = false)]
            public string Title { get; set; }
        }
    }
}
