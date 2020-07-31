using BurgerBuilder.DataAccess.Interfaces;
using BurgerBuilder.DTOs.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace BurgerBuilder.DataAccess.Repositories
{
    public class IngridientsRepository : IIngridientsRepository
    {
        private readonly BurgerBuilderContext _context;
        public IngridientsRepository(BurgerBuilderContext context)
        {
            _context = context;
        }

        public void InsertIngridients(Ingridients input)
        {
            _context.Ingridients.Add(input);
            _context.SaveChanges();
        }
    }
}
