using System.Collections.Generic;
using System.Linq;
using BurgerBuilder.DataAccess.Interfaces;
using BurgerBuilder.DTOs.Classes;
using Microsoft.EntityFrameworkCore;

namespace BurgerBuilder.DataAccess.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly BurgerBuilderContext _context;

        public OrderRepository(BurgerBuilderContext context)
        {
            _context = context;
        }

        public IEnumerable<Order> GetOrders()
            => _context.Orders
            .Include(x => x.Ingridients)
            .Include(x => x.Customer)
            .Select(x => x);

        public void InsertOrder(Order input)
        {
            _context.Orders.Add(input);
            _context.SaveChanges();
        }
    }
}
