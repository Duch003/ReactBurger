using BurgerBuilder.Core.Interfaces;
using BurgerBuilder.DTOs.Classes;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace BurgerBuilder.Core.Services
{
    public class IngridientsService : IIngridientsService
    {
        private readonly IConfiguration _configuration;

        public IngridientsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Result<Ingridients> GetInitialIngridients()
        {
            try
            {
                var ingridients = _configuration.GetSection("InitialIngridients").Get<Ingridients>();
                if(ingridients is null)
                {
                    throw new Exception("No ingridients defined.");
                }
                return new Result<Ingridients>(ingridients);
            }
            catch (Exception e)
            {
                return new Result<Ingridients>(null, e);
            }
        }
    }
}
