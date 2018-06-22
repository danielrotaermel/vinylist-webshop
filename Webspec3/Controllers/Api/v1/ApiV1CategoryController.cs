using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using webspec3.Controllers.Api.v1.Requests;
using webspec3.Controllers.Api.v1.Responses;
using webspec3.Entities;
using webspec3.Extensions;
using webspec3.Filters;
using webspec3.Services;

namespace webspec3.Controllers.Api.v1
{
    /// <summary>
    /// Controller providing api access to categories
    /// 
    /// M. Narr
    /// </summary>
    [Route("api/v1/categories")]
    //[AutoValidateAntiforgeryToken]
    public sealed class ApiV1CategoryController : Controller
    {
        private readonly ICategoryService categoryService;
        private readonly IProductService productService;
        private readonly ILogger logger;
        private readonly IWishlistService wishlistService;
        private readonly IImageService imageService;

        public ApiV1CategoryController(ICategoryService categoryService, IProductService productService, ILogger<ApiV1CategoryController> logger, IWishlistService wishlistService, IImageService imageService)
        {
            this.categoryService = categoryService;
            this.productService = productService;
            this.logger = logger;
            this.wishlistService = wishlistService;
            this.imageService = imageService;
        }

        /// <summary>
        /// Returns a list of all available categories including the amount of products associated with each category
        /// </summary>
        /// <response code="200">Categories received successfully</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> GetAll()
        {
            logger.LogDebug($"Attempting to get all categories.");

            var categories = await categoryService.GetAllAsync();

            logger.LogInformation($"Got {categories.Count} categories from the database.");

            return Json(categories.Select(x => new ApiV1CategoryResponseModel
            {
                Id = x.categoryEntity.Id,
                Title = x.categoryEntity.Title,
                ProductCount = x.productCount
            }));
        }

        /// <summary>
        /// Creates a new category
        /// </summary>
        /// <response code="200">Category successfully created</response> 
        /// <response code="400">Invalid model or a category with the specified title exists already</response>  
        /// <response code="403">No permission to create categories</response>  
        /// <response code="500">An internal error occurred</response>
        [HttpPost]
        [AdminRightsRequired]
        public async Task<IActionResult> CreateNew([FromBody]ApiV1CategoryCreateRequestModel model)
        {
            logger.LogDebug($"Attempting to create new category.");

            if (model != null && ModelState.IsValid)
            {
                // Check if a category with the requested name exists already
                if (categoryService.DoesCategoryNameExist(model.Title))
                {
                    logger.LogWarning($"A category with the name {model.Title} exists already. Aborting request.");
                    return BadRequest(new ApiV1ErrorResponseModel("A category with this name exists already."));
                }

                var categoryEntity = new CategoryEntity
                {
                    Title = model.Title
                };

                await categoryService.AddAsync(categoryEntity);

                logger.LogInformation($"Successfully added new category with title {model.Title}.");

                return Json(new
                {
                    categoryEntity.Id,
                    categoryEntity.Title
                });
            }
            else
            {
                logger.LogWarning($"Error while creating new category. Validation failed.");

                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }

        /// <summary>
        /// Updates the specified category
        /// </summary>
        /// <response code="200">Category successfully updated</response> 
        /// <response code="400">Invalid model or a category with the specified title exists already</response>  
        /// <response code="403">No permission to update categories</response>  
        /// <response code="500">An internal error occurred</response>
        [HttpPut("{categoryId}")]
        [AdminRightsRequired]
        public async Task<IActionResult> Update([FromRoute] Guid categoryId, [FromBody]ApiV1CategoryUpdateRequestModel model)
        {
            logger.LogDebug($"Attempting to update category with id {categoryId}.");

            if (model != null && ModelState.IsValid && categoryId == model.Id)
            {
                // Check if category exists
                var categoryEntity = await categoryService.GetByIdAsync(categoryId);

                if (categoryEntity == null)
                {
                    logger.LogWarning($"Cannot update category. A category with id {categoryId} does not exist.");
                    return BadRequest(new ApiV1ErrorResponseModel($"A category with id {categoryId} does not exist."));
                }

                // Check if a category with the requested (new) name exists already -> be sure to let a model with a non-changed title pass
                if (categoryService.DoesCategoryNameExist(model.Title) && categoryEntity.Title.ToLower() != model.Title.ToLower())
                {
                    logger.LogWarning($"A category with the name {model.Title} exists already. Aborting request.");
                    return BadRequest(new ApiV1ErrorResponseModel("A category with this name exists already."));
                }

                categoryEntity.Title = model.Title;

                await categoryService.UpdateAsync(categoryEntity);

                logger.LogInformation($"Successfully updated category with title {model.Title}.");

                return Json(new
                {
                    categoryEntity.Id,
                    categoryEntity.Title
                });
            }
            else
            {
                logger.LogWarning($"Error while updating category. Validation failed.");

                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }

        /// <summary>
        /// Removes the specified category.
        /// All products with the specified category will be removed including corresponding images and products in wishlists
        /// </summary>
        /// <response code="200">Category successfully deleted</response> 
        /// <response code="400">Invalid model or a category with the specified id does not exist</response>  
        /// <response code="403">No permission to delete categories</response>  
        /// <response code="500">An internal error occurred</response> 
        [HttpDelete("{categoryId}")]
        [AdminRightsRequired]
        public async Task<IActionResult> Delete([FromRoute] Guid categoryId)
        {
            logger.LogDebug($"Attempting to delete category with id {categoryId}.");

            if (categoryId != null)
            {
                // Check if category exits
                var category = await categoryService.GetByIdAsync(categoryId);

                if (category == null)
                {
                    logger.LogWarning($"A category with id {categoryId} does not exist.");
                    return BadRequest(new ApiV1ErrorResponseModel($"A category with with id {categoryId} does not exist."));
                }

                var productList = await categoryService.GetAllProductyByCategoryIdAsync(categoryId);

                if (productList == null)
                {              
                    logger.LogWarning($"The category with id {categoryId} has no products.");
                    return BadRequest(new ApiV1ErrorResponseModel($"The category with id {categoryId} has no products at all."));
                }
                
                // Remove all Wishlists with the products of this category first
                await wishlistService.DeleteWishlistsByProductsAsync(productList);
                
                // Remove all products with the specified category
                await productService.DeleteAllAsync(productList);

                //Remove all images of the products of this category
                await imageService.DeleteImagesByCategoryAsync(productList);
                
                // Remove the category itself
                await categoryService.DeleteAsync(category);

                return Ok();
            }
            else
            {
                logger.LogDebug($"Error while deleting category. Validation failed.");

                return BadRequest(new ApiV1ErrorResponseModel("Please specify a valid category id."));
            }
        }
    }
}
