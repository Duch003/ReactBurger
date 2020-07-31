using BurgerBuilder.DataAccess.Interfaces;
using BurgerBuilder.DTOs.Classes;

namespace BurgerBuilder.DataAccess.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly BurgerBuilderContext _context;

        public OrderRepository(BurgerBuilderContext context)
        {
            _context = context;
        }

        public void InsertOrder(Order input)
        {
            _context.Orders.Add(input);
            _context.SaveChanges();
        }
    }
}
