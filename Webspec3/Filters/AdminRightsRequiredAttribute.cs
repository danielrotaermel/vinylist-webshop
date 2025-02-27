﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using webspec3.Services;

namespace webspec3.Filters
{
    /// <summary>
    /// Filter which only allows admin users to process the annotated action
    /// 
    /// J.Mauthe
    /// </summary>
    public sealed class AdminRightsRequiredAttribute : TypeFilterAttribute
    {
        public AdminRightsRequiredAttribute() : base(typeof(AdminRightsRequiredAttributeImpl))
        {
        }

        private sealed class AdminRightsRequiredAttributeImpl : ActionFilterAttribute
        {
            private readonly IUserService userService;

            private readonly ILoginService loginService;

            public AdminRightsRequiredAttributeImpl(IUserService userService, ILoginService loginService)
            {
                this.userService = userService;
                this.loginService = loginService;
            }

            public override void OnActionExecuting(ActionExecutingContext context)
            {
                if (!loginService.IsLoggedIn())
                {
                    // Check if user is logged in, if not, abort and return access denied (403)
                    context.Result = new ContentResult
                    {
                        StatusCode = 403
                       
                    };
                    return;
                }

                var userGuid = loginService.GetLoggedInUserId();
                var userEntity = userService.GetByIdAsync(userGuid).Result;

                if (userEntity == null)
                {
                    // Check if user is exists, if not, abort and return access denied (403)
                    context.Result = new ContentResult
                    {
                        StatusCode = 403
                    };
                    return;
                }

                if (!userEntity.IsAdmin)
                {
                    // Return access denied(403) if the user is no admin
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