using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webspec3.Controllers.Api.v1.Requests;
using webspec3.Controllers.Api.v1.Responses;
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
        private readonly II18nService i18nService;
        private readonly IWishlistService wishlistService;

        public ApiV1ProductController(IProductService productService, ILogger<ApiV1ProductController> logger,
            IImageService imageService, IWishlistService wishlistService)
        {
            this.productService = productService;
            this.logger = logger;
            this.imageService = imageService;
            this.i18nService = i18nService;
            this.wishlistService = wishlistService;
        }

        /// <summary>
        /// Returns all products
        /// </summary>
        /// <response code="200">Products returned successfully</response>
        /// <response code="403">No permissions to get raw products</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet]
        [ProducesResponseType(typeof(List<ApiV1ProductReponseModel>), 200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> Get()
        {
            logger.LogDebug($"Attempting to get all products.");

            var products = await productService.GetAllAsync();

            logger.LogInformation($"Received {products.Count} products from the database.");

            return Json(products.Select(x => x.ToApiV1ProductResponseModel()).ToList());
        }

        /// <summary>
        /// Returns all products with paging
        /// </summary>
        /// <param name="page">Page to retrieve</param>
        /// <param name="model">Paging and sorting options</param>
        /// <response code="200">Products returned successfully</response>
        /// <response code="400">Invalid model</response>
        /// <response code="403">No permissions to get raw products</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("paged")]
        [ProducesResponseType(typeof(PagingInformation<ApiV1ProductReponseModel>), 200)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> GetPaged([FromQuery]ApiV1ProductPagingSortingFilteringRequestModel model)
        {
            logger.LogDebug($"Attempting to get paged products: Page: {model.Page}, items per page: {model.ItemsPerPage}.");

            if (ModelState.IsValid)
            {
                // Check if the requested language exists
                if (!i18nService.SupportedLanguages.Any(x => x.Code == model.LanguageCode))
                {
                    return BadRequest(new ApiV1ErrorResponseModel("The requested language does not exist."));
                }

                var pagingSortingOptions = new PagingSortingParams
                {
                    ItemsPerPage = model.ItemsPerPage,
                    Page = model.Page,
                    SortBy = model.SortBy,
                    SortDirection = model.SortDirection
                };

                var filterOptions = new FilterParams
                {
                    FilterBy = model.FilterBy,
                    FilterQuery = model.FilterQuery,
                    FilterLanguage = model.LanguageCode
                };

                var productPagingInformation = await productService.GetPagedAsync(pagingSortingOptions, filterOptions);

                var productPagingInformationResponse = new PagingInformation<ApiV1ProductReponseModel>
                {
                    CurrentPage = productPagingInformation.CurrentPage,
                    Items = productPagingInformation.Items.Select(x => x.ToApiV1ProductResponseModel()).ToList(),
                    ItemsPerPage = productPagingInformation.ItemsPerPage,
                    PageCount = productPagingInformation.PageCount,
                    TotalItems = productPagingInformation.TotalItems
                };

                logger.LogInformation(
                    $"Received {productPagingInformationResponse.Items.Count} products from the database.");

                return Json(productPagingInformationResponse);
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
        /// <response code="403">No permissions to get raw products</response>
        /// <response code="404">Product with the specified id not found</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiV1ProductReponseModel), 200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            logger.LogDebug($"Attempting to get product with id {id}.");

            var product = await productService.GetByIdAsync(id);

            if (product == null)
            {
                logger.LogWarning($"Product with id {id} could not be found.");

                return NotFound();
            }

            return Json(product.ToApiV1ProductResponseModel());
        }

        /// <summary>
        /// Creates a new product
        /// </summary>
        /// <param name="model">Product to create</param>
        /// <response code="200">Product created successfully</response>
        /// <response code="400">Invalid model</response>
        /// <response code="403">No permissions to create new products</response>
        /// <response code="500">An internal error occurred</response>
        [HttpPost]
        [AdminRightsRequired]
        [ProducesResponseType(typeof(ApiV1ProductReponseModel), 200)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> CreateNew([FromBody] ApiV1ProductCreateRequestModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                logger.LogDebug(
                    $"Attempting to add new product with {model.Prices.Count} prices and {model.Translations.Count} translations.");

                var imageEntity = new ImageEntity
                {
                    Base64String = model.Image.Base64String,
                    Description = model.Image.Description,
                    ImageType = model.Image.ImageType
                };

                // Add image to database
                await imageService.AddAsync(imageEntity);

                var productEntity = new ProductEntity
                {
                    Artist = model.Artist,
                    CategoryId = model.CategoryId,
                    ImageId = imageEntity.Id,
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

                // Add product with prices and translations to database
                await productService.AddAsync(productEntity, productPriceEntities, productTranslationEntities);

                logger.LogInformation($"Successfully added new product.");

                // Get product
                var newProduct = await productService.GetByIdAsync(productEntity.Id);

                return Ok(newProduct.ToApiV1ProductResponseModel());
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
        /// <response code="403">No permission to update products</response>
        /// <response code="500">An internal error occurred</response>
        [HttpPut("{productId}")]
        [AdminRightsRequired]
        [ProducesResponseType(typeof(ProductEntity), 200)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> Update([FromRoute] Guid productId,
            [FromBody] ApiV1ProductUpdateRequestModel model)
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

                var oldImageId = product.ImageId;

                // If the image got updated
                if (product.Image.Base64String != model.Image.Base64String
                    || product.Image.Description != model.Image.Description
                    || product.Image.ImageType != model.Image.ImageType)
                {
                    var newImage = new ImageEntity
                    {
                        Base64String = model.Image.Base64String,
                        Description = model.Image.Description,
                        ImageType = model.Image.ImageType
                    };

                    await imageService.AddAsync(newImage);
                    product.ImageId = newImage.Id;
                }

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

                await productService.UpdateAsync(product);

                //Delete old Image
                if (oldImageId != product.ImageId)
                {
                    await imageService.DeleteAsync(oldImageId);
                }

                logger.LogInformation($"Successfully updated product with id {model.Id}.");

                var newProduct = await productService.GetByIdAsync(productId);

                return Ok(newProduct);
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
        /// <response code="403">No permissions to delete products</response>
        /// <response code="500">An internal error occurred</response>
        [HttpDelete("{productId}")]
        [AdminRightsRequired]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
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
                
                // Delete corresponding wishlists
                await wishlistService.DeleteByProductId(product.Id);

                await productService.DeleteAsync(product);

                // Delete corresponding Images
                await imageService.DeleteAsync(product.ImageId);

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