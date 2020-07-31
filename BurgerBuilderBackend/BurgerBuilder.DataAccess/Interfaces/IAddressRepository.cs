using BurgerBuilder.DTOs.Classes;

namespace BurgerBuilder.DataAccess.Interfaces
{
    public interface IAddressRepository
    {
        void InsertAddress(Address input);
    }
}