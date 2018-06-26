using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using webspec3.Controllers.Api.v1;
using webspec3.Controllers.Api.v1.Requests;
using webspec3.Controllers.Api.v1.Responses;
using webspec3.Entities;
using webspec3.Services;
using webspec3.Services.Impl;
using Xunit;

namespace webspec3Tests
{
    /// <summary>
    /// M. Narr
    /// </summary>
    public sealed class LoginControllerTest
    {
        [Fact]
        public async void AlreadyLoggedInTest()
        {
            var loginService = ProvideService<ILoginService>(x =>
            {
                x
                    .Setup(y => y.IsLoggedIn())
                    .Returns(true);
            });

            var loginController = ProvideController(loginService);

            var result = await loginController.Login(new ApiV1LoginRequestModel
            {
                EMail = "test@test.de",
                Password = "test123"
            });

            // Controller should return 400 because one cannot login twice
            Assert.IsType<BadRequestObjectResult>(result);
            var objectResult = result as ObjectResult;

            Assert.IsAssignableFrom<ApiV1ErrorResponseModel>(objectResult.Value);
            Assert.Equal("Cannot login twice. Please logout first.", (objectResult.Value as ApiV1ErrorResponseModel).ErrorMessage);
        }

        [Fact]
        public async void NonExistentUserTest()
        {
            var loginController = ProvideController();

            var result = await loginController.Login(new ApiV1LoginRequestModel
            {
                EMail = "test@test.de",
                Password = "test123"
            });

            // Controller should return 403 if a user does not exist
            Assert.IsType<ObjectResult>(result);
            Assert.IsAssignableFrom<ApiV1ErrorResponseModel>((result as ObjectResult).Value);

            var objectResult = result as ObjectResult;

            Assert.Equal(403, objectResult.StatusCode);
            Assert.Equal("The combination of password an username is wrong or the user does not exist at all.", (objectResult.Value as ApiV1ErrorResponseModel).ErrorMessage);
        }

        [Fact]
        public async void ExistentUserWrongPasswordTest()
        {
            var userService = ProvideService<IUserService>(x =>
            {
                // Password is test123
                x
                    .Setup(y => y.GetByEMailAsync("test@test.de"))
                    .ReturnsAsync(new UserEntity
                    {
                        Id = new Guid("6C338CA3-4D9F-44DC-BF3E-0FEE01312EAE"),
                        Email = "test@test.de",
                        FirstName = "Max",
                        LastName = "Mustermann",
                        IsAdmin = false,
                        Password = "3/JZB8DNw/I5RXOsrPCyyt2cNo4598GSqpfBg40Qcjc=$/5KvnmvDJsSTU3ZQlaT5TWdxGikt7IoRla9SNuPFf5E="
                    });
            });

            var loginService = ProvideService<ILoginService>(x =>
            {
                x
                    .Setup(y => y.IsLoggedIn())
                    .Returns(false);
            });

            var loginController = ProvideController(loginService, new HMACSHA512PasswordService(), userService, null);

            var result = await loginController.Login(new ApiV1LoginRequestModel
            {
                EMail = "test@test.de",
                Password = "abc"
            });

            // Controller should return 403 if a the password is wrong
            Assert.IsType<ObjectResult>(result);
            Assert.IsAssignableFrom<ApiV1ErrorResponseModel>((result as ObjectResult).Value);

            var objectResult = result as ObjectResult;

            Assert.Equal(403, objectResult.StatusCode);
            Assert.Equal("The combination of password an username is wrong or the user does not exist at all.", (objectResult.Value as ApiV1ErrorResponseModel).ErrorMessage);
        }

        [Fact]
        public async void LoginSuccessfulTest()
        {
            var userService = ProvideService<IUserService>(x =>
            {
                // Password is test123
                x
                    .Setup(y => y.GetByEMailAsync("test@test.de"))
                    .ReturnsAsync(new UserEntity
                    {
                        Id = new Guid("6C338CA3-4D9F-44DC-BF3E-0FEE01312EAE"),
                        Email = "test@test.de",
                        FirstName = "Max",
                        LastName = "Mustermann",
                        IsAdmin = false,
                        Password = "3/JZB8DNw/I5RXOsrPCyyt2cNo4598GSqpfBg40Qcjc=$/5KvnmvDJsSTU3ZQlaT5TWdxGikt7IoRla9SNuPFf5E="
                    });
            });

            var loginService = ProvideService<ILoginService>(x =>
            {
                x
                    .Setup(y => y.IsLoggedIn())
                    .Returns(false);
            });

            var loginController = ProvideController(loginService, new HMACSHA512PasswordService(), userService, null);

            var result = await loginController.Login(new ApiV1LoginRequestModel
            {
                EMail = "test@test.de",
                Password = "test123"
            });

            // Controller should return 200 if user exists and password is correct
            Assert.IsType<OkObjectResult>(result);

            var objectResult = result as OkObjectResult;

            Assert.Equal(200, objectResult.StatusCode);
        }

        private T ProvideService<T>(Action<Mock<T>> configureAction = null) where T : class
        {
            var mock = new Mock<T>();
            configureAction?.Invoke(mock);
            return mock.Object;
        }

        private ApiV1LoginController ProvideController(ILoginService loginService = null, IPasswordService passwordService = null, IUserService userService = null, ILogger<ApiV1LoginController> logger = null)
        {
            if (loginService == null)
            {
                loginService = ProvideService<ILoginService>();
            }

            if (passwordService == null)
            {
                passwordService = ProvideService<IPasswordService>();
            }

            if (userService == null)
            {
                userService = ProvideService<IUserService>();
            }

            if (logger == null)
            {
                logger = ProvideService<ILogger<ApiV1LoginController>>();
            }

            return new ApiV1LoginController(loginService, passwordService, userService, logger);
        }
    }
}
