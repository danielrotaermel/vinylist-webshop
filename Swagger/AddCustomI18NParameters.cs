using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;
using System.Linq;
using webspec3.Attributes;
using webspec3.Services.Impl;

namespace webspec3.Swagger
{
    /// <summary>
    /// Swagger filter to add two custom fields to the space page (currency and language selection)
    /// 
    /// M. Narr
    /// </summary>
    public sealed class AddCustomI18NParameters : IOperationFilter
    {
        public void Apply(Operation operation, OperationFilterContext context)
        {
            if (operation.Parameters == null)
            {
                operation.Parameters = new List<IParameter>();
            }

            // Only add the new parameters to actions and controllers which have the attribute ResponseI18Nable assigned
            var hasActionAttribute = context.ApiDescription.ActionAttributes().OfType<ResponseI18NableAttribute>().Any();
            var hasControllerAttribute = context.ApiDescription.ControllerAttributes().OfType<ResponseI18NableAttribute>().Any();

            if (hasControllerAttribute || hasActionAttribute)
            {
                operation.Parameters.Add(new NonBodyParameter
                {
                    Name = I18nService.HEADER_CURRENCY,
                    In = "header",
                    Type = "string",
                    Required = false,
                    Default = null
                });

                operation.Parameters.Add(new NonBodyParameter
                {
                    Name = I18nService.HEADER_LANGUAGE,
                    In = "header",
                    Type = "string",
                    Required = false,
                    Default = null
                });
            }
        }
    }
}
