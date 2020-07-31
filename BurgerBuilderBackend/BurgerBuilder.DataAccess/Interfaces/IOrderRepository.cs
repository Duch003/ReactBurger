using BurgerBuilder.DTOs.Classes;

namespace BurgerBuilder.DataAccess.Interfaces
{
    public interface IOrderRepository
    {
        void InsertOrder(Order input);
    }
}