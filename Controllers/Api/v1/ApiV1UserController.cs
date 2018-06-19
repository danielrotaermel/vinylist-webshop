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
    /// Example controller with DB access
    /// M. Narr
    /// </summary>
    [Route("api/v1/users")]
    [AutoValidateAntiforgeryToken]
    public sealed class ApiV1UserController : Controller
    {
        private readonly IPasswordService passwordService;
        private readonly IUserService userService;
        private readonly ILoginService loginService;

        private readonly ILogger logger;

        public ApiV1UserController(IPasswordService passwordService, IUserService userService, ILoginService loginService, ILogger<ApiV1UserController> logger)
        {
            this.passwordService = passwordService;
            this.userService = userService;
            this.loginService = loginService;

            this.logger = logger;
        }

        /// <summary>
        /// Returns information about the currently logged in user
        /// </summary>
        /// <response code="200">Current user returned successfully</response>
        /// <response code="400">No user is logged in at the moment</response>
        /// <response code="403">No user is logged in at the moment</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet("current")]
        [LoginRequired]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> GetCurrentUser()
        {
            logger.LogDebug($"Attempting to get the current user.");

            // Check if a user is logged in
            if (!loginService.IsLoggedIn())
            {
                logger.LogWarning($"No user logged in at the moment. Returning.");

                return BadRequest(new ApiV1ErrorResponseModel($"There is no user logged in at the moment."));
            }

            var user = await userService.GetByIdAsync(loginService.GetLoggedInUserId());

            if (user == null)
            {
                logger.LogError($"Could not find the currently logged in user.");

                return StatusCode(500, "An internal error occurred.");
            }

            return Json(new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.IsAdmin
            });
        }

        /// <summary>
        /// Returns a list of all users
        /// </summary>
        /// <response code="200">List of users returned</response>
        /// <response code="403">No permission to get all users</response>
        /// <response code="500">An internal error occurred</response>
        [HttpGet]
        [AdminRightsRequired]
        [ProducesResponseType(200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> Get()
        {
            logger.LogDebug($"Attempting to get a list of all users");

            var users = await userService.GetAll();

            logger.LogInformation($"Got {users.Count} users from the database.");

            return Json(users.Select(x => new
            {
                x.Id,
                x.FirstName,
                x.LastName,
                x.Email,
                x.IsAdmin
            }));
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
        public async Task<IActionResult> CreateNew([FromBody]ApiV1UserCreateRequestModel model)
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
                        Password = passwordService.HashPassword(model.Password),
                        IsAdmin = false
                    };

                    await userService.AddAsync(user);

                    logger.LogInformation($"Successfully created new user with email {model.Email}.");


                    return Ok(new
                    {
                        user.Id,
                        user.FirstName,
                        user.LastName,
                        user.Email,
                        user.IsAdmin
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

        /// <summary>
        /// Updates the specified user.
        /// Generally the currently logged in user is allowed to update himself.
        /// Admins are allowed to update all users.
        ///
        /// If the password field within the model is left blank, the password will not be updated.
        /// </summary>
        /// <response code="200">User successfully updated</response>
        /// <response code="400">Invalid model</response>
        /// <response code="403">The user does not exist, or no permission to update the user</response>
        /// <response code="500">An internal error occurred</response>
        [HttpPut("{userId}")]
        [LoginRequired]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> Update([FromRoute]Guid userId, [FromBody]ApiV1UserUpdateRequestModel model)
        {
            // Check if model is valid
            if (model != null && userId != null && ModelState.IsValid)
            {
                logger.LogDebug($"Attempting to update user with email {model.Email}.");

                try
                {
                    // Check if the user exists
                    var user = await userService.GetByIdAsync(userId);

                    if (user == null)
                    {
                        return StatusCode(403);
                    }

                    // Check if user updates himself or admin is updating
                    if (!loginService.IsAdmin() && loginService.GetLoggedInUserId() != user.Id)
                    {
                        logger.LogWarning($"Only an admin can update arbitrary users. A user can only update himself.");

                        return StatusCode(403);
                    }

                    // Update the user
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.Email = model.Email;


                    // Set new password, if provided
                    if (!string.IsNullOrEmpty(model.Password))
                    {
                        user.Password = passwordService.HashPassword(model.Password);
                    }

                    // Set new admin status, if the current user is admin
                    if (loginService.IsAdmin())
                    {
                        user.IsAdmin = model.IsAdmin;
                    }

                    await userService.UpdateAsync(user);

                    logger.LogInformation($"Successfully updated user with email {model.Email}.");


                    return Ok(new
                    {
                        user.Id,
                        user.FirstName,
                        user.LastName,
                        user.Email,
                        user.IsAdmin
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
                logger.LogWarning($"Error while updating user. Validation failed.");

                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }

        /// <summary>
        /// Deletes the specified user and all corresponding data.
        /// Generally the currently logged in user is allowed to delete himself.
        /// Admins are allowed to delete all users.
        /// </summary>
        /// <response code="200">User successfully deleted</response>
        /// <response code="400">Invalid model</response>
        /// <response code="403">The user does not exist, or no permission to delete the user</response>
        /// <response code="500">An internal error occurred</response>
        [HttpDelete("{userId}")]
        [LoginRequired]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> Delete([FromRoute]Guid userId)
        {
            // Check if model is valid
            if (userId != null)
            {
                logger.LogDebug($"Attempting to delete user with id {userId}");

                try
                {
                    // Check if the user exists
                    var user = await userService.GetByIdAsync(userId);

                    if (user == null)
                    {
                        return StatusCode(403);
                    }

                    // Check if user updates himself or admin is updating
                    if (!loginService.IsAdmin() && loginService.GetLoggedInUserId() != user.Id)
                    {
                        logger.LogWarning($"Only an admin can delete arbitrary users. A user can only delete himself.");

                        return StatusCode(403);
                    }

                    await userService.DeleteAsync(user);

                    logger.LogInformation($"Successfully deleted user with id {userId}.");

                    // Logout current user deleted himself
                    if (loginService.GetLoggedInUserId() == userId)
                    {
                        loginService.Logout();
                    }

                    return Ok();
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, $"Error while handling request: {ex.Message}.");
                    return StatusCode(500, new ApiV1ErrorResponseModel("Error while handling request."));
                }
            }
            else
            {
                logger.LogWarning($"Error while deleting user. Validation failed.");

                return BadRequest(ModelState.ToApiV1ErrorResponseModel());
            }
        }
    }
}
