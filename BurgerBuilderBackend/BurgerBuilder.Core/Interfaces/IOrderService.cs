using BurgerBuilder.DTOs.Classes;
using System.Collections.Generic;

namespace BurgerBuilder.Core.Interfaces
{
    public interface IOrderService
    {
        Result<Order> AddOrder(Order order);
        Result<IEnumerable<Order>> GetOrders();
    }
}