using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BurgerBuilder.Core.Interfaces;
using BurgerBuilder.DTOs.Classes;
using Microsoft.AspNetCore.Mvc;

namespace BurgerBuilder.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BurgerController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly IIngridientsService _ingridientsService;

        public BurgerController(IOrderService orderService, IIngridientsService ingridientsService)
        {
            _orderService = orderService;
            _ingridientsService = ingridientsService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return StatusCode(200, "DZIAŁA");
        }

        [HttpPost]
        public IActionResult Add(Order order)
        {
            var result = _orderService.AddOrder(order);
            if (result.IsFine)
            {
                return StatusCode(201, result.Value);
            }
            else
            {
                return StatusCode(500, result.Exception.Message);
            }
            
        }

        [HttpGet("initialingridients")]
        public IActionResult InitialIngridients()
        {
            var result = _ingridientsService.GetInitialIngridients();
            if (result.IsFine)
            {
                return StatusCode(201, result.Value);
            }
            else
            {
                return StatusCode(500, result.Exception.Message);
            }

        }
    }
}