using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using webspec3.Controllers.Api.v1.Requests;
using webspec3.Controllers.Api.v1.Responses;
using webspec3.Entities;
using webspec3.Extensions;
using webspec3.Services;

namespace webspec3.Controllers.Api.v1
{
    /// <summary>
    /// Example controller with DB access
    /// M. Narr
    /// </summary>
    [Route("api/v1/users")]
    public sealed class ApiV1UserController : Controller
    {
        private readonly IPasswordService passwordService;
        private readonly IUserService userService;

        private readonly ILogger logger;

        public ApiV1UserController(IPasswordService passwordService, IUserService userService, ILogger<ApiV1UserController> logger)
        {
            this.passwordService = passwordService;
            this.userService = userService;

            this.logger = logger;
        }

        /// <summary>
        /// Creates/registers a new user
        /// </summary>
        /// <response code="200">User successfully created</response>
        /// <response code="400">An user with the provided data exists already/Invalid model</response>
        /// <response code="500">An internal error occurred</response>
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 400)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> CreateNew([FromBody]ApiV1UserCreateUpdateRequestModel model)
        {
            // Check if model is valid
            if (model != null && ModelState.IsValid)
            {
                logger.LogDebug($"Attempting to create a new user with email {model.Email}.");

                try
                {
                    // Check if a user with this email exists already
                    if (await userService.DoesEMailExistAsync(model.Email))
                    {
                        logger.LogWarning($"Error while creating new user. A user with email {model.Email} exists already.");

                        return BadRequest(new ApiV1ErrorResponseModel($"A user with email {model.Email} exists already."));
                    }

                    // Add new user to database
                    var user = new UserEntity
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Email = model.Email,
                        Password = passwordService.HashPassword(model.Password)
                    };

                    await userService.AddAsync(user);

                    logger.LogInformation($"Successfully created new user with email {model.Email}.");


                    return Ok(new
                    {
                        user.Id,
                        user.FirstName,
                        user.LastName,
                        user.Email
                    });
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, $"Error while handling request: {ex.Message}.");
                    return StatusCode(500, new ApiV1ErrorResponseModel("Error while handling request."));
                }
            }
            else
            {
                logger.LogWarning($"Error while creating new user. Validation failed.");

                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }
    }
}
