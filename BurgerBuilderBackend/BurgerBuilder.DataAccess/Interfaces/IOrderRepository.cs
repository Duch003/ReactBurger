using BurgerBuilder.DTOs.Classes;
using System.Collections.Generic;

namespace BurgerBuilder.DataAccess.Interfaces
{
    public interface IOrderRepository
    {
        void InsertOrder(Order input);
        IEnumerable<Order> GetOrders();
    }
}