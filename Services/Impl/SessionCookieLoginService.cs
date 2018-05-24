using Microsoft.AspNetCore.Http;
using System;

namespace webspec3.Services.Impl
{
    /// <summary>
    /// Simple login service representation based on a session cookie.
    /// Implements <see cref="ILoginService"/>
    /// 
    /// M. Narr
    /// </summary>
    public sealed class SessionCookieLoginService : ILoginService
    {
        private const string KEY_USER_ID = "user_id";
        private const string KEY_IS_ADMIN = "is_admin";

        private const string IS_ADMIN = "IS_ADMIN";
        private const string IS_NO_ADMIN = "IS_NO_ADMIN";

        private readonly IHttpContextAccessor httpContextAccessor;

        private readonly IUserService userService;

        public SessionCookieLoginService(IHttpContextAccessor httpContextAccessor, IUserService userService)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.userService = userService;
        }

        public Guid GetLoggedInUserId()
        {
            if (!IsLoggedIn())
            {
                throw new InvalidOperationException(
                    "No user is logged in at the moment. Check if a user is logged in before via. IsLoggedIn()");
            }

            return Guid.Parse(httpContextAccessor.HttpContext.Session.GetString(KEY_USER_ID));
        }

        public bool IsLoggedIn()
        {
            return !string.IsNullOrEmpty(httpContextAccessor.HttpContext.Session.GetString(KEY_USER_ID));
        }

        public async void Login(Guid userId)
        {
            httpContextAccessor.HttpContext.Session.SetString(KEY_USER_ID, userId.ToString());
            var isAdmin = await userService.IsUserAdmin(userId);

            httpContextAccessor.HttpContext.Session.SetString(KEY_IS_ADMIN, isAdmin ? IS_ADMIN : IS_NO_ADMIN);
        }

        public void Logout()
        {
            httpContextAccessor.HttpContext.Session.Remove(KEY_USER_ID);
            httpContextAccessor.HttpContext.Session.Remove(KEY_IS_ADMIN);
        }

        public bool IsAdmin()
        {
            if (!string.IsNullOrEmpty(httpContextAccessor.HttpContext.Session.GetString(KEY_IS_ADMIN)))
            {
                return false;
            }

            return httpContextAccessor.HttpContext.Session.GetString(KEY_IS_ADMIN) == IS_ADMIN;
        }
    }
}