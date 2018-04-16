using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using webspec3.Services;

namespace webspec3.Filters
{
    /// <summary>
    /// Filter which only allows logged-in users to proceed.
    /// All other users will be served with access denied (403).
    /// 
    /// M. Narr
    /// </summary>
    public sealed class LoginRequiredAttribute : TypeFilterAttribute
    {
        public LoginRequiredAttribute() : base(typeof(LoginRequiredAttributeImpl))
        {

        }

        /// <summary>
        /// Additional helper class.
        /// We need this to get access to DI
        /// 
        /// M. Narr
        /// </summary>
        private sealed class LoginRequiredAttributeImpl : ActionFilterAttribute
        {
            private readonly ILoginService loginService;

            public LoginRequiredAttributeImpl(ILoginService loginService)
            {
                this.loginService = loginService;
            }

            public override void OnActionExecuting(ActionExecutingContext context)
            {
                // Check if user is logged in, if not, abort and return access denied (403)
                if (!loginService.IsLoggedIn())
                {
                    context.Result = new ContentResult
                    {
                        StatusCode = 403
                    };
                }
                else
                {
                    base.OnActionExecuting(context);
                }
            }
        }
    }
}
