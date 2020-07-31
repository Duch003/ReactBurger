using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BurgerBuilder.Core.Interfaces;
using BurgerBuilder.Core.Services;
using BurgerBuilder.DataAccess;
using BurgerBuilder.DataAccess.Interfaces;
using BurgerBuilder.DataAccess.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BurgerBuilder.API
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
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddDbContext<BurgerBuilderContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(Configuration.GetConnectionString("BurgerBuilder"));
                optionsBuilder.EnableSensitiveDataLogging();
            });
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyHeader());
            });

            services.AddTransient<IAddressRepository, AddressRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IIngridientsRepository, IngridientsRepository>();

            services.AddTransient<IIngridientsService, IngridientsService>();
            services.AddTransient<IOrderService, OrderService>();

            services.AddTransient(x => Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseHttpsRedirection();
            app.UseCors(options =>
            {
                options.AllowAnyOrigin().AllowAnyHeader();
            });

            app.UseRouting();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
