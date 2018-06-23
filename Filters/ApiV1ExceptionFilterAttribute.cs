using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;
using webspec3.Controllers.Api.v1.Responses;

namespace webspec3.Filters
{
    /// <summary>
    /// Custom exception filter for filtering api exceptions in production mode and returning a proper json response
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1ExceptionFilterAttribute : TypeFilterAttribute
    {
        public ApiV1ExceptionFilterAttribute() : base(typeof(ApiV1ExceptionFilterAttributeImpl))
        {
        }

        /// <summary>
        /// Additional helper class.
        /// We need this to get access to DI.
        /// 
        /// M. Narr
        /// </summary>
        private sealed class ApiV1ExceptionFilterAttributeImpl : ExceptionFilterAttribute
        {
            private readonly IHostingEnvironment env;

            public ApiV1ExceptionFilterAttributeImpl(IHostingEnvironment env)
            {
                this.env = env;
            }

            public override void OnException(ExceptionContext context)
            {
                if (env.IsDevelopment())
                {
                    base.OnException(context);
                }
                else
                {
                    var error = new ApiV1ErrorResponseModel("An error occurred, please try again later.");
                    context.HttpContext.Response.StatusCode = 500;
                    context.Result = new JsonResult(error);

                    base.OnException(context);
                }

            }

            public override async Task OnExceptionAsync(ExceptionContext context)
            {
                if (env.IsDevelopment())
                {
                    await base.OnExceptionAsync(context);
                }
                else
                {
                    var error = new ApiV1ErrorResponseModel("An error occurred, please try again later.");
                    context.HttpContext.Response.StatusCode = 500;
                    context.Result = new JsonResult(error);

                    await base.OnExceptionAsync(context);
                }
            }
        }
    }
}
