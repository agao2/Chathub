﻿using System;
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
using core_server.Models;
using StackExchange.Redis;

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
            services.AddSignalR();
            services.AddSwaggerGen( c => {
                c.SwaggerDoc("v1", new Info {Title = "core api" , Version = "v1"});
            });

            // Configurations for postgres database
            String PGHOST = Environment.GetEnvironmentVariable("PGHOST") ?? "localhost";
            String PGPORT = Environment.GetEnvironmentVariable("PGPORT") ?? "5432";
            String PGUSER = Environment.GetEnvironmentVariable("PGUSER") ?? "postgres";
            String PGPASSWORD = Environment.GetEnvironmentVariable("PGPASSWORD") ?? "password";
            String PGDATABASE = Environment.GetEnvironmentVariable("PGDATABASE") ?? "chathub";
            String DB_CONNECTION = $"Host={PGHOST};Port={PGPORT};Username={PGUSER};Password={PGPASSWORD};Database={PGDATABASE}";
            // Configurations for redis
            String REDIS_HOST = Environment.GetEnvironmentVariable("REDIS_HOST") ?? "localhost";
            String REDIS_PORT = Environment.GetEnvironmentVariable("REDIS_PORT") ?? "6379";
            String REDIS_CONNECTION  = $"{REDIS_HOST}:{REDIS_PORT}";

            services.AddDbContext<UserContext>(options => options.UseNpgsql(DB_CONNECTION));
            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(REDIS_CONNECTION));
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
