using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using webspec3.Controllers.Api.v1.Requests;
using webspec3.Entities;
using webspec3.Extensions;
using webspec3.Services;

namespace webspec3.Controllers.Api.v1
{
    /// <summary>
    /// Controller providing api access to products
    /// 
    /// M. Narr
    /// </summary>
    [Route("api/v1/products")]
    public sealed class ApiV1ProductController : Controller
    {
        private readonly IProductService productService;
        private readonly ILogger logger;

        public ApiV1ProductController(IProductService productService, ILogger<ApiV1ProductController> logger)
        {
            this.productService = productService;
            this.logger = logger;
        }

        /// <summary>
        /// Returns all products in a consolidated manner (i18n/l10n is considered)
        /// </summary>
        /// <response code="200">Products returned successfully</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            logger.LogDebug($"Attempting to get all consolidated products.");

            var products = await productService.GetAllConsolidated();

            logger.LogInformation($"Received {products.Count} products from the database.");

            return Json(products);
        }

        /// <summary>
        /// Returns the product with the specified id in a consolidated manner (i18n/l10n is considered)
        /// </summary>
        /// <param name="id">Product id</param>
        /// <response code="200">Products returned successfully</response>
        /// <response code="404">Product with the specified id not found</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute]Guid id)
        {
            logger.LogDebug($"Attempting to get consolidated product with id {id}.");

            var product = await productService.GetConsolidatedById(id);

            if (product == null)
            {
                logger.LogWarning($"Product with id {id} could not be found.");

                return NotFound();
            }

            return Json(product);
        }

        /// <summary>
        /// Creates a new product
        /// </summary>
        /// <param name="model">Product to create</param>
        /// <response code="200">Product created successfully</response>
        /// <response code="400">Invalid model</response>
        /// <response code="500">An internal error occurred</response>
        [HttpPost]
        public async Task<IActionResult> CreateNew([FromBody]ApiV1ProductCreateUpdateRequestModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                logger.LogDebug($"Attempting to add new product with {model.Prices.Count} prices and {model.Translations.Count} translations.");

                var productEntity = new ProductEntity
                {
                    Artist = model.Artist,
                    CategoryId = model.CategoryId,
                    Label = model.Label,
                    ReleaseDate = model.ReleaseDate
                };

                var productPriceEntities = model.Prices
                    .Select(x => new ProductPriceEntity
                    {
                        CurrencyId = x.CurrencyId,
                        Price = x.Price
                    })
                    .ToList();

                var productTranslationEntities = model.Translations
                    .Select(x => new ProductTranslationEntity
                    {
                        Description = x.Description,
                        DescriptionShort = x.DescriptionShort,
                        LanguageId = x.LanguageId,
                        Title = x.Title
                    })
                    .ToList();

                await productService.AddAsync(productEntity, productPriceEntities, productTranslationEntities);

                logger.LogInformation($"Successfully added new product.");

                return Ok();
            }
            else
            {
                logger.LogWarning($"Erorr while adding product. Validation failed");

                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }
    }
}
