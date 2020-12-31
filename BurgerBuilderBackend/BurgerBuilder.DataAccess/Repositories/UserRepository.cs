using BurgerBuilder.DataAccess.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace BurgerBuilder.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BurgerBuilderContext _context;

        public UserRepository(BurgerBuilderContext context)
        {
            _context = context;
        }

        public IdentityUser GetUserById(string id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }
    }
}
