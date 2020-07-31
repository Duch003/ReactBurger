using BurgerBuilder.DTOs.Classes;

namespace BurgerBuilder.Core.Interfaces
{
    public interface IOrderService
    {
        Result<Order> AddOrder(Order order);
    }
}