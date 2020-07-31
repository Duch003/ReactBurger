using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BurgerBuilder.DTOs.Classes
{
    public class Customer
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public Address Address { get; set; }
    }
}
