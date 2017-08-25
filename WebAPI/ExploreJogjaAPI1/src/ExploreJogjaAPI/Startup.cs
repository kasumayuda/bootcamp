using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExploreJogjaAPI.Model.User;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.AspNetCore.Mvc.Versioning;
using ExploreJogjaAPI.Filters;
using ExploreJogjaAPI.Infrastructure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.AspNetCore.Http;

namespace ExploreJogjaAPI
{
    public class Startup
    {

        private readonly int? _httpsport;
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsEnvironment("Development"))
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

            if (env.IsDevelopment()) {
                var launchJsonConfig = new ConfigurationBuilder()
                    .SetBasePath(env.ContentRootPath)
                    .AddJsonFile("Properties\\launchSettings.json")
                    .Build();
                _httpsport = launchJsonConfig.GetValue<int>("iisSettings:iisExpress:sslPort");
            }

        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            var sqlConnectionString = Configuration.GetConnectionString("DataAccessPostgreSqlProvider");

            services.AddDbContext<ExploreJogjaAPIContext>(opt => {
                opt.UseNpgsql(
                    sqlConnectionString
                );
                //opt.UseInMemoryDatabase();
                opt.UseOpenIddict();
            });
            
            services.Configure<IdentityOptions>(opt => {
                opt.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
                opt.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
                opt.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
            });

            services.AddOpenIddict<Guid>(opt => {
                opt.AddEntityFrameworkCoreStores<ExploreJogjaAPIContext>();
                opt.AddMvcBinders();

                opt.EnableTokenEndpoint("/token");
                opt.AllowPasswordFlow();
            });
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddIdentity<UserEntity, UserRoleEntity>()
                .AddEntityFrameworkStores<ExploreJogjaAPIContext, Guid>()
                .AddDefaultTokenProviders();
            
            services.AddCors(options => {
                options.AddPolicy("SiteCorsPolicy", 
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
            
            services.AddMvc( opt => {

                opt.Filters.Add(typeof(JsonExceptionFilter));

                var jsonFormatter = opt.OutputFormatters.OfType<JsonOutputFormatter>().Single();
                opt.OutputFormatters.Remove(jsonFormatter);
                opt.OutputFormatters.Add(new IonOutputFormatter(jsonFormatter));

                opt.SslPort = _httpsport;
                opt.Filters.Add(typeof(RequireHttpsAttribute));
            });

            //services.Configure<MvcOptions>(options =>
            //{
            //    options.Filters.Add(new CorsAuthorizationFilterFactory("SiteCorsPolicy"));
            //});

            services.AddRouting(opt => opt.LowercaseUrls = true);

            services.AddApiVersioning(opt=>{
                opt.ApiVersionReader = new MediaTypeApiVersionReader();
                opt.AssumeDefaultVersionWhenUnspecified = true;
                opt.ReportApiVersions = true;
                opt.DefaultApiVersion = new ApiVersion(1, 0);
                opt.ApiVersionSelector = new CurrentImplementationApiVersionSelector(opt);
            });

            //services.Configure<>
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment()) {
                var roleManager = app.ApplicationServices.GetRequiredService<RoleManager<UserRoleEntity>>();
                var userManager = app.ApplicationServices.GetRequiredService<UserManager<UserEntity>>();
                AddTestUsers(roleManager, userManager).Wait();
                var context = app.ApplicationServices.GetRequiredService<ExploreJogjaAPIContext>();
                //var dateLogicService = app.ApplicationServices.GetRequiredService<IDateLogicService>();
                //AddTestData(context, dateLogicService, userManager);

            }

            app.UseCors("SiteCorsPolicy");
            app.UseExceptionHandler(appBuilder => {
                appBuilder.Run(async context => {
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");   // I needed to add this otherwise in Angular I Would get "Response with status: 0 for URL"
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync("Internal Server Error");
                });
            });

            app.UseApplicationInsightsRequestTelemetry();

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseHsts(opt => {
                opt.MaxAge(days: 180);
                opt.IncludeSubdomains();
                opt.Preload();
            });
            app.UseIdentity();
            app.UseOAuthValidation();
            app.UseOpenIddict();
            
            app.UseMvc();
            
        }
        
        private static async Task AddTestUsers(
            RoleManager<UserRoleEntity> roleManager, 
            UserManager<UserEntity> userManager) {

            var resultRole = await roleManager.CreateAsync(new UserRoleEntity("Admin"));

            var user = new UserEntity {
                Email = "kasuma.yuda@mitrais.com",
                Firstname = "Kasuma",
                LastName = "Yuda",
                UserName = "kasuma.yuda@mitrais.com"

            };

            var resulta = await userManager.CreateAsync(user, "Abcd123!");
            var resultb = await userManager.AddToRoleAsync(user, "Admin");
            var resultc = await userManager.UpdateAsync(user);

        }
    }
}
