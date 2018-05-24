using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webspec3.Controllers.Api.v1.Responses;
using webspec3.Services;

namespace webspec3.Controllers.Api.v1
{
    /// <summary>
    /// Controller providing api access to getting images by Id
    /// 
    /// J. Mauthe
    /// </summary>
    [Route("api/v1/images")]
    public sealed class ApiV1ImageController : Controller
    {
        private readonly ILogger logger;
        private readonly IImageService imageService;

        public ApiV1ImageController(ILogger<ApiV1ImageController> logger, IImageService imageService)
        {
            this.logger = logger;
            this.imageService = imageService;
        }

        [HttpGet("{imageId}")]
        public async Task<IActionResult> Get([FromRoute] Guid imageId)
        {
            try
            {
                logger.LogDebug($"Attempting to get image with id {imageId}.");

                var image = await imageService.GetByIdAsync(imageId);

                // Check if image exists at all
                if (image == null)
                {
                    logger.LogWarning($"Error while getting image: Image with id {imageId} does not exist.");

                    return BadRequest(new ApiV1ErrorResponseModel($"A Image with id {imageId} does not exist."));
                }

                return Json(new
                {
                    image.Id,
                    image.Description,
                    image.Base64String,
                    image.ImageType
                });
            }
            catch (Exception ex)
            {
                logger.LogError($"Error while getting image with id {imageId}.");
                logger.LogError(ex.Message);
                return StatusCode(500, new ApiV1ErrorResponseModel("Error while getting image."));
            }
        }
    }
}