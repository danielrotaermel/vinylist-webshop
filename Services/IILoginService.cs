using System;

namespace webspec3.Services
{
    /// <summary>
    /// Interface representing a login service
    /// 
    /// M. Narr
    /// </summary>
    public interface ILoginService
    {
        /// <summary>
        /// Returns the id of the currently logged in user, or null if no user is logged in
        /// </summary>
        /// <returns>Id of the currently logged in user, or null if no user is logged in</returns>
        Guid GetLoggedInUserId();

        /// <summary>
        /// Whether a user is logged in at the moment
        /// </summary>
        /// <returns>True if a user is logged in, else false</returns>
        bool IsLoggedIn();

        /// <summary>
        /// Performs login for the specified user id
        /// </summary>
        /// <param name="userId">User id of the user to login</param>
        void Login(Guid userId);

        /// <summary>
        /// Log out the user
        /// </summary>
        void Logout();

        /// <summary>
        /// Weather a juser is admin or not
        /// </summary>
        /// <returns>True if a user is admin, else flase</returns>
        bool IsAdmin();
    }
}
