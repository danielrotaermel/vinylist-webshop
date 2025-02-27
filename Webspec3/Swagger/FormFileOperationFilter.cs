﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Reflection;

namespace webspec3.Swagger
{
    /// <summary>
    /// Helper class to support file uploads within swagger page
    /// 
    /// M. Narr (Copied and adapted from https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/193)
    /// </summary>
    public sealed class FormFileOperationFilter : IOperationFilter
    {
        private struct ContainerParameterData
        {
            public readonly ParameterDescriptor Parameter;
            public readonly PropertyInfo Property;

            public string FullName => $"{Parameter.Name}.{Property.Name}";
            public string Name => Property.Name;

            public ContainerParameterData(ParameterDescriptor parameter, PropertyInfo property)
            {
                Parameter = parameter;
                Property = property;
            }
        }

        private static readonly ImmutableArray<string> iFormFilePropertyNames =
            typeof(IFormFile).GetTypeInfo().DeclaredProperties.Select(p => p.Name).ToImmutableArray();

        public void Apply(Operation operation, OperationFilterContext context)
        {
            var parameters = operation.Parameters;
            if (parameters == null)
                return;

            var @params = context.ApiDescription.ActionDescriptor.Parameters;
            if (parameters.Count == @params.Count)
                return;

            var formFileParams =
                (from parameter in @params
                 where parameter.ParameterType.IsAssignableFrom(typeof(IFormFile))
                 select parameter).ToArray();

            var iFormFileType = typeof(IFormFile).GetTypeInfo();
            var containerParams =
                @params.Select(p => new KeyValuePair<ParameterDescriptor, PropertyInfo[]>(
                    p, p.ParameterType.GetProperties()))
                .Where(pp => pp.Value.Any(p => iFormFileType.IsAssignableFrom(p.PropertyType)))
                .SelectMany(p => p.Value.Select(pp => new ContainerParameterData(p.Key, pp)))
                .ToImmutableArray();

            if (!(formFileParams.Any() || containerParams.Any()))
                return;

            var consumes = operation.Consumes;
            consumes.Clear();
            consumes.Add("application/form-data");

            if (!containerParams.Any())
            {
                var nonIFormFileProperties =
                    parameters.Where(p =>
                        !(iFormFilePropertyNames.Contains(p.Name)
                        && string.Compare(p.In, "formData", StringComparison.OrdinalIgnoreCase) == 0))
                        .ToImmutableArray();

                parameters.Clear();
                foreach (var parameter in nonIFormFileProperties) parameters.Add(parameter);

                foreach (var parameter in formFileParams)
                {
                    parameters.Add(new NonBodyParameter
                    {
                        Name = parameter.Name,
                        //Required = true,
                        Type = "file",
                        In = "formData"
                    });
                }
            }
            else
            {
                var paramsToRemove = new List<IParameter>();
                foreach (var parameter in containerParams)
                {
                    var parameterFilter = parameter.Property.Name + ".";
                    paramsToRemove.AddRange(from p in parameters
                                            where p.Name.StartsWith(parameterFilter)
                                            select p);
                }
                paramsToRemove.ForEach(x => parameters.Remove(x));

                foreach (var parameter in containerParams)
                {
                    if (iFormFileType.IsAssignableFrom(parameter.Property.PropertyType))
                    {
                        var originalParameter = parameters.FirstOrDefault(param => param.Name == parameter.Name);
                        parameters.Remove(originalParameter);

                        parameters.Add(new NonBodyParameter
                        {
                            Name = parameter.Name,
                            Required = originalParameter.Required,
                            Type = "file",
                            In = "formData"
                        });
                    }
                }
            }
        }
    }
}
