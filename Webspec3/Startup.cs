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
using webspec3.Database;
using webspec3.Services;
using webspec3.Services.Impl;
using webspec3.Swagger;
using Microsoft.AspNetCore.Antiforgery;

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
                options.Cookie.SameSite = SameSiteMode.Strict;
            });

            services.AddAntiforgery(options =>
            {
                // Should be considered for prodcution mode !!!
                options.Cookie.SecurePolicy = CookieSecurePolicy.None;

                options.HeaderName = "X-XSRF-TOKEN";
                options.SuppressXFrameOptionsHeader = false;
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

                c.OperationFilter<AddCustomI18NParameters>();
                c.OperationFilter<FormFileOperationFilter>();
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

            services.AddTransient<II18nService, I18nService>();

            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IImageService, ImageService>();
            services.AddTransient<IWishlistService, WishlistService>();
            services.AddTransient<IOrderService, OrderService>();

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IAntiforgery antiforgery, IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();


            // Add XSRF token to all non-api requests
            app.Use(async (context, next) =>
            {
                string path = context.Request.Path.Value;

                if (path != null && !path.ToLower().Contains("/api"))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
                        new CookieOptions
                        {
                            HttpOnly = false,

                            // Should be considered for production mode !!!
                            Secure = false
                        }
                    );
                }

                await next();
            });

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
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
