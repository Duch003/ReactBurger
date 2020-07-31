using BurgerBuilder.DTOs.Classes;

namespace BurgerBuilder.DataAccess.Interfaces
{
    public interface ICustomerRepository
    {
        void InsertCustomer(Customer input);
    }
}