using BurgerBuilder.DataAccess.Interfaces;
using BurgerBuilder.DTOs.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace BurgerBuilder.DataAccess.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly BurgerBuilderContext _context;

        public AddressRepository(BurgerBuilderContext context)
        {
            _context = context;
        }

        public void InsertAddress(Address input)
        {
            _context.Addresses.Add(input);
            _context.SaveChanges();
        }
    }
}
