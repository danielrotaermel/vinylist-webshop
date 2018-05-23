using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using webspec3.Database;
using webspec3.Entities;

namespace webspec3.Services.Impl
{
    /// <summary>
    /// Implementation of <see cref="IUserService"/>
    /// 
    /// M. Narr
    /// </summary>
    public sealed class UserService : EntityServiceBase<UserEntity>, IUserService
    {
        private const string entityName = "user";

        private readonly WebSpecDbContext dbContext;
        private readonly ILogger logger;

        public UserService(WebSpecDbContext dbContext, ILogger<UserService> logger) : base(dbContext, dbContext.Users,
            logger, entityName)
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        public async Task<List<UserEntity>> GetAll()
        {
            logger.LogDebug($"Attempting to get all users.");

            var users = await dbContext.Users
                 .OrderBy(x => x.LastName)
                 .ToListAsync();

            logger.LogInformation($"Received {users.Count} users from the database.");

            return users;
        }

        public async Task<UserEntity> GetByEMailAsync(string email)
        {
            logger.LogDebug($"Attempting to get user with email {email}.");

            return await dbContext.Users
                .Where(x => x.Email.ToLower() == email.ToLower())
                .FirstOrDefaultAsync();
        }

        public async Task<bool> DoesEMailExistAsync(string email)
        {
            logger.LogDebug($"Checking if a user with email {email} exists already.");

            return await dbContext.Users
                       .Where(x => x.Email.ToLower() == email.ToLower())
                       .CountAsync() > 0;
        }

        public async Task<bool> IsUserAdmin(Guid userId)
        {
            logger.LogDebug($"Checking if the user with id {userId} has admin rights");

            var user = await dbContext.Users
                .Where(x => x.Id == userId)
                .FirstOrDefaultAsync();

            return user.IsAdmin;
        }
    }
}