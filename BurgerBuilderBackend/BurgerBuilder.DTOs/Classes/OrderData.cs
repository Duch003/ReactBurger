using System;
using System.Collections.Generic;
using System.Text;

namespace BurgerBuilder.DTOs.Classes
{
    public class OrderData
    {
        public int ID { get; set; }
        public string Country { get; set; }
        public string DeliveryMethod { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
    }
}
