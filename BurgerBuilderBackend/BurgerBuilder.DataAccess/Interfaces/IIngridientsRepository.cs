using BurgerBuilder.DTOs.Classes;

namespace BurgerBuilder.DataAccess.Interfaces
{
    public interface IIngridientsRepository
    {
        void InsertIngridients(Ingridients input);
    }
}