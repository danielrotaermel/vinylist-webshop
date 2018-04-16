using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;
using webspec3.Controllers.Api.v1.Responses;
using static webspec3.Controllers.Api.v1.Responses.ApiV1ErrorResponseModel;

namespace webspec3.Extensions
{
    /// <summary>
    /// Extensions regarding <see cref="ModelStateDictionary"/>
    /// 
    /// M. Narr
    /// </summary>
    public static class ModelStateDictionaryExtensions
    {
        /// <summary>
        /// Converts the errors within a <see cref="ModelStateDictionary"/> into an instance of <see cref="ApiV1ErrorResponseModel"/>
        /// </summary>
        /// <param name="modelStateDictionary"></param>
        /// <returns>Instance of <see cref="ApiV1ErrorResponseModel"/></returns>
        public static ApiV1ErrorResponseModel ToApiV1ErrorResponseModel(this ModelStateDictionary modelStateDictionary)
        {
            var validationErrors = modelStateDictionary.Keys
                 .SelectMany(x => modelStateDictionary[x].Errors.Select(y => new ValidationError(x, y.ErrorMessage)))
                 .ToList();

            return new ApiV1ErrorResponseModel
            {
                ErrorMessage = "Validation failed.",
                ValidationErrors = validationErrors
            };
        }
    }
}
