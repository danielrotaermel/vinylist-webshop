using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using webspec3.Database;

namespace webspec3.Controllers.Api.v1
{
    /// <summary>
    /// Example controller with DB access
    /// M. Narr
    /// </summary>
    [Route("api/v1/users")]
    public sealed class ApiV1UserController : Controller
    {
        private readonly WebSpecDbContext dbContext;
        private readonly ILogger logger;

        public ApiV1UserController(WebSpecDbContext dbContext, ILogger<ApiV1UserController> logger)
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        /// <summary>
        /// Retrieves a list of all users from the database
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            logger.LogDebug("Attempting to get all users.");

            var users = await dbContext.Users
                .ToListAsync();

            logger.LogInformation($"Found {users.Count} users in the database.");

            return Json(users);
        }
    }
}
