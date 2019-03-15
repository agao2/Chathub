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
using core_server.Models;

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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
            // {
            //     builder
            //         .AllowAnyMethod()
            //         .AllowAnyHeader()
            //         .WithOrigins("http://localhost:3000");
            // }));
            services.AddSignalR();
            services.AddSwaggerGen( c => {
                c.SwaggerDoc("v1", new Info {Title = "core api" , Version = "v1"});
            });
            Console.WriteLine(Configuration.GetConnectionString("DefaultConnection"));
            
            services.AddDbContext<UserContext>(options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
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

            if(env.IsEnvironment("Docker")){
                Console.WriteLine("It is in docker environment");
            }

            // app.UseHttpsRedirection();
            app.UseCors(builder => builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            app.UseMvc();
            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>("/chatHub");
            });
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "core api");
            });
        }
    }
}
