using System.Linq;
using webspec3.Controllers.Api.v1.Responses;
using webspec3.Entities;

namespace webspec3.Extensions
{
    /// <summary>
    /// Product entity extension methods
    /// 
    /// M. Narr
    /// </summary>
    public static class ProductEntityExtensions
    {
        /// <summary>
        /// Converts an instance of <see cref="ProductEntity"/> to an instance of <see cref="ApiV1ProductReponseModel"/>
        /// </summary>
        /// <param name="productEntity">Instance of <see cref="ProductEntity"/> to convert</param>
        /// <returns>Instance of <see cref="ApiV1ProductReponseModel"/></returns>
        public static ApiV1ProductReponseModel ToApiV1ProductResponseModel(this ProductEntity productEntity)
        {
            var productResponse = new ApiV1ProductReponseModel
            {
                Id = productEntity.Id,
                Artist = productEntity.Artist,
                CategoryId = productEntity.CategoryId,
                Image = new ApiV1ProductReponseModel.ApiV1ImageResponseModel
                {
                    Base64String = productEntity.Image.Base64String,
                    Description = productEntity.Image.Description,
                    ImageType = productEntity.Image.ImageType
                },
                Label = productEntity.Label,
                Languages = productEntity.Translations.Select(x => new ApiV1ProductReponseModel.ApiV1LanguageResponseModel
                {
                    LanguageId = x.LanguageId,
                    Description = x.Description,
                    DescriptionShort = x.DescriptionShort,
                    Title = x.Title
                })
                .ToList(),
                Prices = productEntity.Prices.Select(x => new ApiV1ProductReponseModel.ApiV1PriceResponseModel
                {
                    CurrencyId = x.CurrencyId,
                    Price = x.Price
                })
                .ToList(),
                ReleaseDate = productEntity.ReleaseDate
            };


            return productResponse;
        }
    }
}
