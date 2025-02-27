﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webspec3.Controllers.Api.v1.Requests;
using webspec3.Controllers.Api.v1.Responses;
using webspec3.Extensions;
using webspec3.Filters;
using webspec3.Services;

namespace webspec3.Controllers.Api.v1 {
    /// <summary>
    /// Controller providing api access to login and logout
    ///
    /// M. Narr
    /// </summary>
    [Route ("api/v1")]
    [AutoValidateAntiforgeryToken]
    [ApiV1ExceptionFilter]
    public sealed class ApiV1LoginController : Controller {
        private readonly ILoginService loginService;
        private readonly IPasswordService passwordService;
        private readonly IUserService userService;

        private readonly ILogger logger;

        public ApiV1LoginController (ILoginService loginService, IPasswordService passwordService, IUserService userService, ILogger<ApiV1LoginController> logger) {
            this.loginService = loginService;
            this.passwordService = passwordService;
            this.userService = userService;

            this.logger = logger;
        }

        /// <summary>
        /// Logs in the specified user
        /// </summary>
        /// <response code="200">Successfully logged in</response>
        /// <response code="400">Invalid request model or already logged in</response>
        /// <response code="403">Password and/or username was incorrect</response>
        /// <response code="500">An internal error occurred</response>
        [HttpPost ("login")]
        [ProducesResponseType (200)]
        [ProducesResponseType (typeof (ApiV1ErrorResponseModel), 400)]
        [ProducesResponseType (typeof (ApiV1ErrorResponseModel), 403)]
        [ProducesResponseType (typeof (ApiV1ErrorResponseModel), 500)]
        public async Task<IActionResult> Login ([FromBody] ApiV1LoginRequestModel model) {
            if (model != null && ModelState.IsValid) {
                logger.LogDebug ($"Attempting to login user with email {model.EMail}.");

                try {
                    var error = new ApiV1ErrorResponseModel ("The combination of password an username is wrong or the user does not exist at all.");

                    // Throw bad request if a user is logged-in already
                    if (loginService.IsLoggedIn ()) {
                        return BadRequest (new ApiV1ErrorResponseModel ("Cannot login twice. Please logout first."));
                    }

                    // Try to get user from database
                    var user = await userService.GetByEMailAsync (model.EMail);

                    // Check if user exists.
                    // If the user does not exist, we return 403 to not reveal that it does not exist
                    if (user == null) {
                        logger.LogWarning ($"Error while logging in user with email {model.EMail}. The user does not exist.");
                        return StatusCode (403, error);
                    }

                    // Check if password is correct
                    if (passwordService.CheckPassword (model.Password, user.Password)) {
                        loginService.Login (user.Id);
                        logger.LogInformation ($"Successfully logged in user with email {model.EMail}.");

                        return Ok (new {
                            user.Id,
                                user.FirstName,
                                user.LastName,
                                user.Email,
                                user.IsAdmin
                        });
                    } else {
                        logger.LogWarning ($"Error while logging in user with email {model.EMail}: The password is incorrect.");
                        return StatusCode (403, error);
                    }
                } catch (Exception ex) {
                    logger.LogError (ex, $"Error while logging in: {ex.Message}");
                    return StatusCode (500, new ApiV1ErrorResponseModel ("Error while handling request."));
                }
            } else {
                logger.LogWarning ($"Error while logging in. Validation failed.");
                return BadRequest (ModelState.ToApiV1ErrorResponseModel ());
            }
        }

        /// <summary>
        /// Logs out the current user
        /// </summary>
        /// <response code="200">Successfully logged out</response>
        [HttpGet ("logout")]
        [LoginRequired]
        [ProducesResponseType (200)]
        public IActionResult Logout () {
            loginService.Logout ();
            return Ok ();
        }
    }
}