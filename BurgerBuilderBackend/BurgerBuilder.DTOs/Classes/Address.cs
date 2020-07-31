using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BurgerBuilder.DTOs.Classes
{
    public class Address
    {
        public int ID { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string Zipcode { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
