using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using webspec3.Controllers.Api.v1.Requests;
using webspec3.Core.HelperClasses;
using webspec3.Entities;
using webspec3.Extensions;
using webspec3.Filters;
using webspec3.Services;

namespace webspec3.Controllers.Api.v1
{
    /// <summary>
    /// Controller providing api access to products
    /// 
    /// M. Narr, J. Mauthe
    /// </summary>
    [Route("api/v1/products")]
    public sealed class ApiV1ProductController : Controller
    {
        private readonly IProductService productService;
        private readonly ILogger logger;
        private readonly IImageService imageService;

        public ApiV1ProductController(IProductService productService, ILogger<ApiV1ProductController> logger,
            IImageService imageService)
        {
            this.productService = productService;
            this.logger = logger;
            this.imageService = imageService;
        }

        /// <summary>
        /// Returns all products in a consolidated manner (i18n/l10n is considered)
        /// </summary>
        /// <response code="200">Products returned successfully</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("consolidated")]
        public async Task<IActionResult> GetConsolidated()
        {
            logger.LogDebug($"Attempting to get all consolidated products.");

            var products = await productService.GetAllConsolidatedAsync();

            logger.LogInformation($"Received {products.Count} products from the database.");

            return Json(products);
        }

        /// <summary>
        /// Returns all products in a consolidated manner (i18n/l10n is considered) with paging
        /// </summary>
        /// <param name="page">Page to retrieve</param>
        /// <param name="model">Paging and sorting options</param>
        /// <response code="200">Products returned successfully</response>
        /// <response code="400">Invalid model</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("consolidated/paged/{page:int}")]
        public async Task<IActionResult> GetConsolidatedPaged([FromQuery] ApiV1ProductPagingSortingRequestModel model,
            [FromRoute] int page = 1)
        {
            logger.LogDebug(
                $"Attempting to get paged consolidated products: Page: {page}, items per page: {model.ItemsPerPage}.");

            if (ModelState.IsValid)
            {
                var options = new PagingSortingParams
                {
                    ItemsPerPage = model.ItemsPerPage,
                    Page = page,
                    SortBy = model.SortBy,
                    SortDirection = model.SortDirection
                };

                var products = await productService.GetConsolidatedPagedAsync(options);

                logger.LogInformation($"Received {products.Count} products from the database.");

                return Json(products);
            }
            else
            {
                logger.LogWarning($"Error while performing paged request. Validation failed.");
                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }

        /// <summary>
        /// Returns the product with the specified id in a consolidated manner (i18n/l10n is considered)
        /// </summary>
        /// <param name="id">Product id</param>
        /// <response code="200">Products returned successfully</response>
        /// <response code="404">Product with the specified id not found</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("consolidated/{id}")]
        public async Task<IActionResult> GetConsolidatedById([FromRoute] Guid id)
        {
            logger.LogDebug($"Attempting to get consolidated product with id {id}.");

            var product = await productService.GetConsolidatedByIdAsync(id);

            if (product == null)
            {
                logger.LogWarning($"Product with id {id} could not be found.");

                return NotFound();
            }

            return Json(product);
        }

        /// <summary>
        /// Returns all products
        /// </summary>
        /// <response code="200">Products returned successfully</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            logger.LogDebug($"Attempting to get all products.");

            var products = await productService.GetAllAsync();

            logger.LogInformation($"Received {products.Count} products from the database.");

            return Json(products);
        }

        /// <summary>
        /// Returns all products with paging
        /// </summary>
        /// <param name="page">Page to retrieve</param>
        /// <param name="model">Paging and sorting options</param>
        /// <response code="200">Products returned successfully</response>
        /// <response code="400">Invalid model</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("paged/{page:int}")]
        public async Task<IActionResult> GetPaged([FromQuery] ApiV1ProductPagingSortingRequestModel model,
            [FromRoute] int page = 1)
        {
            logger.LogDebug($"Attempting to get paged products: Page: {page}, items per page: {model.ItemsPerPage}.");

            if (ModelState.IsValid)
            {
                var options = new PagingSortingParams
                {
                    ItemsPerPage = model.ItemsPerPage,
                    Page = page,
                    SortBy = model.SortBy,
                    SortDirection = model.SortDirection
                };

                var products = await productService.GetPagedAsync(options);

                logger.LogInformation($"Received {products.Count} products from the database.");

                return Json(products);
            }
            else
            {
                logger.LogWarning($"Error while performing paged request. Validation failed.");
                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }

        /// <summary>
        /// Returns the product with the specified id
        /// </summary>
        /// <param name="id">Product id</param>
        /// <response code="200">Products returned successfully</response>
        /// <response code="404">Product with the specified id not found</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            logger.LogDebug($"Attempting to get product with id {id}.");

            var product = await productService.GetByIdAsync(id);

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
        public async Task<IActionResult> CreateNew([FromBody] ApiV1ProductCreateUpdateRequestModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                logger.LogDebug(
                    $"Attempting to add new product with {model.Prices.Count} prices and {model.Translations.Count} translations.");

                var productEntity = new ProductEntity
                {
                    Artist = model.Artist,
                    CategoryId = model.CategoryId,
                    Label = model.Label,
                    Image = model.Image,
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

                if (model.Image != null)
                {
                    await imageService.AddAsync(model.Image);
                }

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

        /// <summary>
        /// Updates an existing product
        /// </summary>
        /// <param name="productId">Id of the product to update</param>
        /// <param name="model">Product to update</param>
        /// <response code="200">Product updated successfully</response>
        /// <response code="400">Invalid model</response>
        /// <response code="403">Forbidden Request</response>
        /// <response code="500">An internal error occurred</response>
        [HttpPut("{productId}")]
        [AdminRightsRequired]
        public async Task<IActionResult> Update([FromRoute] Guid productId,
            [FromBody] ApiV1ProductCreateUpdateRequestModel model)
        {
            // Check if model is valid
            if (model != null && ModelState.IsValid && productId == model.Id)
            {
                logger.LogDebug($"Attempting to update product with id {productId}.");

                // Get product
                var product = await productService.GetByIdAsync(productId);

                if (product == null)
                {
                    logger.LogWarning($"A product with id {productId} does not exist.");
                    return BadRequest(ModelState.ToApiV1ErrorResponseModel());
                }

                product.Artist = model.Artist;
                product.CategoryId = model.CategoryId;
                product.Label = model.Label;
                product.ReleaseDate = model.ReleaseDate;

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

                product.Prices = productPriceEntities;
                product.Translations = productTranslationEntities;

                // Delete old imageEntity
                if (product.Image == null)
                {
                    var oldImageEntity = await imageService.GetByProductIdAsync(productId);
                    await imageService.DeleteAsync(oldImageEntity);
                }
                else
                {
                    //Image got updated
                    if (product.Image != model.Image)
                    {
                        await imageService.DeleteAsync(product.Image);
                        await imageService.AddAsync(model.Image);
                    }
                }

                await productService.UpdateAsync(product);

                logger.LogInformation($"Successfully updated product with id {model.Id}.");

                return Ok();
            }
            else
            {
                logger.LogWarning($"Error while updating the product. Validation failed.");

                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }

        /// <summary>
        /// Deletes the product with the specified id including all related prices and translations
        /// </summary>
        /// <param name="productId">Id of the product to delete</param>
        /// <response code="200">Product deleted successfully</response>
        /// <response code="400">Invalid model</response>
        /// <response code="500">An internal error occurred</response>
        [HttpDelete("{productId}")]
        public async Task<IActionResult> Delete([FromRoute] Guid productId)
        {
            if (ModelState.IsValid)
            {
                logger.LogDebug($"Attempting to delete product with id {productId}.");

                // Check if product exists
                var product = await productService.GetByIdAsync(productId);

                if (product == null)
                {
                    logger.LogWarning(
                        $"Error while deleting the product with id {productId}. The product does not exist.");

                    return NotFound();
                }

                await productService.DeleteAsync(product);

                logger.LogInformation($"Product with id {productId} has been deleted successfully.");

                return Ok();
            }
            else
            {
                logger.LogWarning($"Error while deleting product with id {productId}.");

                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }
    }
}