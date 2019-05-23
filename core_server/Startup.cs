using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SignalRChat.Hubs;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Swagger;
using core_server.Domain;
using core_server.Infrastructure;
using StackExchange.Redis;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.StackExchangeRedis;
using core_server.Infrastructure.Security;

namespace core_server
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSwaggerGen( c => {
                c.SwaggerDoc("v1", new Info {Title = "core api" , Version = "v1"});
            });

            // Configurations for postgres database
            String PGHOST = Environment.GetEnvironmentVariable("PGHOST") ?? "localhost";
            String PGPORT = Environment.GetEnvironmentVariable("PGPORT") ?? "5432";
            String PGUSER = Environment.GetEnvironmentVariable("PGUSER") ?? "postgres";
            String PGPASSWORD = Environment.GetEnvironmentVariable("PGPASSWORD") ?? "password";
            String PGDATABASE = Environment.GetEnvironmentVariable("PGDATABASE") ?? "chathub";
            // Configurations for redis
            String REDIS_HOST = Environment.GetEnvironmentVariable("REDIS_HOST") ?? "localhost";
            String REDIS_PORT = Environment.GetEnvironmentVariable("REDIS_PORT") ?? "6379";
        
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql( $"Host={PGHOST};Port={PGPORT};Username={PGUSER};Password={PGPASSWORD};Database={PGDATABASE}"));

            services.AddSignalR().AddStackExchangeRedis($"{REDIS_HOST}:{REDIS_PORT}");

            services.AddStackExchangeRedisCache(options=>{
                options.Configuration = $"{REDIS_HOST}:{REDIS_PORT}";
            });

            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddJwt();
            // The session store automatically uses whatever distributed cache is available, so utilizing Redis for it requires no additional configuration.
            services.AddSession(options => {
                options.Cookie.Name = "session-token";
                options.Cookie.HttpOnly = false;
                options.IdleTimeout = TimeSpan.FromMinutes(10);
                options.Cookie.MaxAge = TimeSpan.FromMinutes(10);
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
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // app.UseHttpsRedirection();
            app.UseSession();
            app.UseMvc();
            app.UseSignalR(routes => {
                routes.MapHub<ChatHub>("/chatHub");
            });
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "core api");
            });
        }
    }
}
