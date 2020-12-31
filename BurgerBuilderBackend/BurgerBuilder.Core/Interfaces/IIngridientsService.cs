using BurgerBuilder.DTOs.Classes;
using System.Collections.Generic;

namespace BurgerBuilder.Core.Interfaces
{
    public interface IIngridientsService
    {
        Result<Ingridients> GetInitialIngridients();
        Result<Prices> GetPrices();
    }
}