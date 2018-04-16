using System.Threading.Tasks;
using webspec3.Entities;

namespace webspec3.Services
{
    /// <summary>
    /// Interface describing a general user service providing access to fundamental functions regarding user management
    /// 
    /// M. Narr
    /// </summary>
    public interface IUserService : IEntityService<UserEntity>
    {
        /// <summary>
        /// Returns the user with the specified email.
        /// If no such user exists, null will be returned.
        /// </summary>
        /// <param name="email">Email address</param>
        /// <returns>The user with the specified email, if such an user exists, else null</returns>
        Task<UserEntity> GetByEMailAsync(string email);

        /// <summary>
        /// Checks whether a user with the provided email address exists already
        /// </summary>
        /// <param name="email">Email address to check</param>
        /// <returns>True if a user with the provided email exists already, else false</returns>
        Task<bool> DoesEMailExistAsync(string email);
    }
}
