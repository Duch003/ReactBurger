using BurgerBuilder.DTOs.Classes;

namespace BurgerBuilder.Core.Interfaces
{
    public interface IIngridientsService
    {
        Result<Ingridients> GetInitialIngridients();
    }
}