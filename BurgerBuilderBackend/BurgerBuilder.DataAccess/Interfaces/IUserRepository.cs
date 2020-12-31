using Microsoft.AspNetCore.Identity;

namespace BurgerBuilder.DataAccess.Interfaces
{
    public interface IUserRepository
    {
        IdentityUser GetUserById(string id);
    }
}