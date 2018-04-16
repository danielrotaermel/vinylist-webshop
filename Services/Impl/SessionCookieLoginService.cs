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

        private readonly IHttpContextAccessor httpContextAccessor;

        public SessionCookieLoginService(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public Guid GetLoggedInUserId()
        {
            if (!IsLoggedIn())
            {
                throw new InvalidOperationException("No user is logged in at the moment. Check if a user is logged in before via. IsLoggedIn()");
            }

            return Guid.Parse(httpContextAccessor.HttpContext.Session.GetString(KEY_USER_ID));
        }

        public bool IsLoggedIn()
        {
            return !string.IsNullOrEmpty(httpContextAccessor.HttpContext.Session.GetString(KEY_USER_ID));
        }

        public void Login(Guid userId)
        {
            httpContextAccessor.HttpContext.Session.SetString(KEY_USER_ID, userId.ToString());
        }

        public void Logout()
        {
            httpContextAccessor.HttpContext.Session.Remove(KEY_USER_ID);
        }
    }
}
