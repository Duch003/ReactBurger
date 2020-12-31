using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BurgerBuilder.Core.Interfaces;
using BurgerBuilder.Core.Services;
using BurgerBuilder.Core.Validators;
using BurgerBuilder.DataAccess;
using BurgerBuilder.DataAccess.Interfaces;
using BurgerBuilder.DataAccess.Repositories;
using BurgerBuilder.DTOs.Classes;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;

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
            services
                .AddControllers()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                )
                .AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<IncomingOrderValidator>());
            services.AddDbContext<BurgerBuilderContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(Configuration.GetConnectionString("BurgerBuilder"));
                optionsBuilder.EnableSensitiveDataLogging();
            });
            services.AddIdentity<IdentityUser, IdentityRole>(x =>
            {
                x.Password.RequiredLength = 8;
                x.Password.RequireDigit = true;
                x.Password.RequireLowercase = true;
                x.Password.RequireUppercase = true;
                x.Password.RequiredUniqueChars = 5;
                x.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                x.User.RequireUniqueEmail = true;
            })
                .AddEntityFrameworkStores<BurgerBuilderContext>();
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyHeader());
            });

            services.AddSwaggerGen();

            services.AddTransient<IAddressRepository, AddressRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IIngridientsRepository, IngridientsRepository>();
            services.AddTransient<IUserRepository, UserRepository>();

            services.AddTransient<IIngridientsService, IngridientsService>();
            services.AddTransient<IOrderService, OrderService>();

            services.AddTransient<IValidator<IncomingOrder>, IncomingOrderValidator>();

            services.AddTransient(x => Configuration);

            services.AddTransient(x => SetupMappers());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/v1/swagger.json", "My API V1");
                //c.RoutePrefix = string.Empty;
            });
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
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private IMapper SetupMappers()
        {
            var output = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<IncomingOrder, Order>()
                    .ForMember(dest => dest.Customer, src => src.MapFrom(prop => new Customer
                    {
                        Name = prop.OrderData.Name,
                        Email = prop.OrderData.Email,
                        Address = new Address
                        {
                            Street = prop.OrderData.Street,
                            Zipcode = prop.OrderData.ZipCode,
                            Country = prop.OrderData.Country
                        }
                    }))
                    .ForMember(dest => dest.DeliveryMethod, src => src.MapFrom(prop => prop.OrderData.DeliveryMethod))
                    .ForMember(dest => dest.Ingridients, src => src.MapFrom(prop => prop.Ingridients))
                    .ForMember(dest => dest.Price, src => src.MapFrom(prop => prop.Price))
                    .ForMember(dest => dest.ID, src => src.Ignore());
            });

            output.AssertConfigurationIsValid();
            return output.CreateMapper();
        }
    }
}
