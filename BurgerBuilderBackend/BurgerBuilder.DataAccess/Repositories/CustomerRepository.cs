using BurgerBuilder.DataAccess.Interfaces;
using BurgerBuilder.DTOs.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace BurgerBuilder.DataAccess.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly BurgerBuilderContext _context;

        public CustomerRepository(BurgerBuilderContext context)
        {
            _context = context;
        }

        public void InsertCustomer(Customer input)
        {
            _context.Customers.Add(input);
            _context.SaveChanges();
        }
    }
}
