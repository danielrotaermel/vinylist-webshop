using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.IO;
using Newtonsoft.Json;
using webspec3.Core.I18n;
using webspec3.Database;
using webspec3.Services;
using webspec3.Services.Impl;

namespace webspec3
{
    public sealed class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<WebSpecDbContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("General"));
            });

            services.AddMvc();
            services.AddCors();

            services.AddDistributedMemoryCache();

            // Add support for sessions, default session length is 60 seconds
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(60);
                options.Cookie.HttpOnly = true;

                // Should be considered for prodcution mode !!!
                options.Cookie.SameSite = SameSiteMode.None;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "WebSpec API",
                    Version = "v1"
                });

                var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "webspec3.xml");
                c.IncludeXmlComments(filePath);
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });


            // Register custom services
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient<IPasswordService, HMACSHA512PasswordService>();
            services.AddTransient<ILoginService, SessionCookieLoginService>();

            services.AddTransient<II18nService, I18nService>(serviceProvider =>
            {
                var service = new I18nService();

                service.SupportedCurrencies.Add(new SupportedCurrency
                {
                    Code = "EUR",
                    Title = "Euros"
                });

                service.SupportedCurrencies.Add(new SupportedCurrency
                {
                    Code = "USD",
                    Title = "US Dollars"
                });

                service.SupportedLanguages.Add(new SupportedLanguage
                {
                    Code = "de_DE",
                    Title = "German"
                });

                service.SupportedLanguages.Add(new SupportedLanguage
                {
                    Code = "en_US",
                    Title = "English"
                });

                return service;
            });


            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IUserService, UserService>();

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            // Consider for production mode !!!
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

            app.UseSession();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            // Enable swagger endpoints in development mode
            if (env.IsDevelopment())
            {
                app.UseSwagger();

                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
                });
            }

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
