using System;
using System.Collections.Generic;

namespace webspec3.Controllers.Api.v1.Responses
{
    /// <summary>
    /// Api response model representing a product
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1ProductReponseModel
    {
        /// <summary>
        /// Product id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Product artist
        /// </summary>
        public string Artist { get; set; }

        /// <summary>
        /// Product label
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// Product release date
        /// </summary>
        public DateTime ReleaseDate { get; set; }

        /// <summary>
        /// Product category id
        /// </summary>
        public Guid CategoryId { get; set; }

        /// <summary>
        /// Associated prices
        /// </summary>
        public List<ApiV1PriceResponseModel> Prices { get; set; } = new List<ApiV1PriceResponseModel>();

        /// <summary>
        /// Associated languages
        /// </summary>
        public List<ApiV1LanguageResponseModel> Languages { get; set; } = new List<ApiV1LanguageResponseModel>();


        /// <summary>
        /// M. Narr
        /// </summary>
        public sealed class ApiV1PriceResponseModel
        {
            /// <summary>
            /// Currency id
            /// </summary>
            public string CurrencyId { get; set; }

            /// <summary>
            /// Actual price
            /// </summary>
            public decimal Price { get; set; }
        }

        /// <summary>
        /// M. Narr
        /// </summary>
        public sealed class ApiV1LanguageResponseModel
        {
            /// <summary>
            /// Language id
            /// </summary>
            public string LanguageId { get; set; }

            /// <summary>
            /// Product description
            /// </summary>
            public string Description { get; set; }

            /// <summary>
            /// Product short description
            /// </summary>
            public string DescriptionShort { get; set; }

            /// <summary>
            /// Product title
            /// </summary>
            public string Title { get; set; }
        }
    }
}
