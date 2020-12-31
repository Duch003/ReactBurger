using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using BurgerBuilder.DataAccess.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BurgerBuilder.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthenticationController(UserManager<IdentityUser> userManager,
            IUserRepository userRepository, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LogIn([FromBody]LogInData data)
        {
            Microsoft.AspNetCore.Identity.SignInResult result = null;
            try
            {
                result = await _signInManager.PasswordSignInAsync(data.UserName, data.Password, true, false);

            }
            catch(Exception e)
            {

            }

            return result.Succeeded
                ? (IActionResult)Ok()
                : (IActionResult)Unauthorized();
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> SignUp([FromBody]LogInData data)
        {
            var user = new IdentityUser(data.UserName)
            {
                Email = data.Email,
                EmailConfirmed = false,
            };
            var result = await _userManager.CreateAsync(user, data.Password);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                var output = result.Errors.ToDictionary(key => key.Code, value => value.Description);
                return UnprocessableEntity(output);
            }
        }

        [HttpDelete("deleteaccount")]
        [Authorize]
        public async Task<IActionResult> DeleteAccount(string id)
        {
            var user = _userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                var output = result.Errors.ToDictionary(key => key.Code, value => value.Description);
                return UnprocessableEntity(output);
            }
        }
    }

    public class LogInData
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserName { 
            get
            {
                return Email?.Split('@').FirstOrDefault();
            }
        }
    }
}