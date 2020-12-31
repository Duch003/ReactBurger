using System;
using System.Collections.Generic;
using System.Text;

namespace BurgerBuilder.DTOs.Classes
{
    public class IncomingOrder
    {
        public Ingridients Ingridients { get; set; }
        public decimal Price { get; set; }
        public OrderData OrderData { get; set; }
        public string UserId { get; set; }
    }
}
