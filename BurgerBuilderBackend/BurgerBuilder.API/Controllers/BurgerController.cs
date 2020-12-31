using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using BurgerBuilder.Core.Interfaces;
using BurgerBuilder.Core.Validators;
using BurgerBuilder.DTOs.Classes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace BurgerBuilder.API.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    public class BurgerController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly IIngridientsService _ingridientsService;
        private readonly IMapper _mapper;

        public BurgerController(IOrderService orderService, IIngridientsService ingridientsService, IMapper mapper)
        {
            _orderService = orderService;
            _ingridientsService = ingridientsService;
            _mapper = mapper;
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IActionResult Index()
        {
            return StatusCode(200, "DZIAŁA");
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        public IActionResult Add(IncomingOrder incomingOrder, [FromServices] IncomingOrderValidator validator)
        {
            var validation = validator.Validate(incomingOrder);
            if (!validation.IsValid)
            {
                var message = validation.Errors.Select(x => $"{x.PropertyName}: {x.ErrorMessage} ({x.AttemptedValue})");
                return StatusCode(422, string.Join(';' + Environment.NewLine, message));
            }

            var order = _mapper.Map<Order>(incomingOrder);
            var result = _orderService.AddOrder(order);
            if (result.IsFine)
            {
                return Ok(result.Value);
            }
            else
            {
                return StatusCode(500, result.Exception.Message);
            }
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("orders")]
        public IActionResult Get([FromUri]string auth, [FromUri]string userId)
        {
            var result = _orderService.GetOrders();
            if (result.IsFine)
            {
                return StatusCode(201, result.Value);
            }
            else
            {
                return StatusCode(500, result.Exception.Message);
            }
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("initialingridients")]
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

        [Microsoft.AspNetCore.Mvc.HttpGet("pricetable")]
        public IActionResult PriceTable()
        {
            var result = _ingridientsService.GetPrices();
            if (result.IsFine)
            {
                return StatusCode(200, result.Value);
            }
            else
            {
                return StatusCode(500, result.Exception.Message);
            }
        }
    }
}