using BurgerBuilder.DTOs.Classes;
using FluentValidation;

namespace BurgerBuilder.Core.Validators
{
    public class IncomingOrderValidator : AbstractValidator<IncomingOrder>
    {
        private string _ingridientsNotSet = "Ingridients have to be set.";
        private string _ingridientLessThanZero = "Ingridient amount can not be negative.";
        private string _priceNegative = "Price can not be negative.";
        private string _orderDataNotSet = "OrderData has to be provided.";
        private string _orderDataEmailInvalid = "Invalid email.";
        private string _orderDataPropertyInvalid = "Address has to be provided.";

        public IncomingOrderValidator()
        {
            RuleFor(x => x.Ingridients).NotNull().WithMessage(_ingridientsNotSet);
            RuleFor(x => x.Ingridients.Bacon).GreaterThanOrEqualTo(0).WithMessage(_ingridientLessThanZero);
            RuleFor(x => x.Ingridients.Salad).GreaterThanOrEqualTo(0).WithMessage(_ingridientLessThanZero);
            RuleFor(x => x.Ingridients.Meat).GreaterThanOrEqualTo(0).WithMessage(_ingridientLessThanZero);
            RuleFor(x => x.Ingridients.Cheese).GreaterThanOrEqualTo(0).WithMessage(_ingridientLessThanZero);
            RuleFor(x => x.Price).GreaterThanOrEqualTo(0).WithMessage(_priceNegative);
            RuleFor(x => x.OrderData).NotNull().WithMessage(_orderDataNotSet);
            RuleFor(x => x.OrderData.Country).NotNull().NotEmpty().WithMessage(_orderDataPropertyInvalid);
            RuleFor(x => x.OrderData.DeliveryMethod).NotNull().NotEmpty().WithMessage(_orderDataPropertyInvalid);
            RuleFor(x => x.OrderData.Email).EmailAddress().WithMessage(_orderDataEmailInvalid);
            RuleFor(x => x.OrderData.Name).NotNull().NotEmpty().WithMessage(_orderDataPropertyInvalid);
            RuleFor(x => x.OrderData.Street).NotNull().NotEmpty().WithMessage(_orderDataPropertyInvalid);
            RuleFor(x => x.OrderData.ZipCode).NotNull().NotEmpty().WithMessage(_orderDataPropertyInvalid);
        }
    }
}
