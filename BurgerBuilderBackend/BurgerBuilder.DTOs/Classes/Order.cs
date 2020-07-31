using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BurgerBuilder.DTOs.Classes
{
    public class Order
    {
        public int ID { get; set; }
        [Required]
        public Ingridients Ingridients { get; set; }
        public decimal Price { get; set; }
        [Required]
        public Customer Customer { get; set; }
        [Required]
        public string DeliveryMethod { get; set; }
    }
}
