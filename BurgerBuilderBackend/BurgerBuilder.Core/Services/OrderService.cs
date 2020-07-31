﻿using BurgerBuilder.Core.Interfaces;
using BurgerBuilder.DataAccess.Interfaces;
using BurgerBuilder.DTOs.Classes;
using System;

namespace BurgerBuilder.Core.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;

        public OrderService(IOrderRepository repository)
        {
            _repository = repository;
        }

        public Result<Order> AddOrder(Order order)
        {
            try
            {
                _repository.InsertOrder(order);
                return new Result<Order>(order, null);
            }
            catch (Exception e)
            {
                return new Result<Order>(null, e);
            }
        }
    }
}
