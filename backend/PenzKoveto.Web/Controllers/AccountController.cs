using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Penzkoveto.Web.Models;
using PenzKoveto.Repository;
using PenzKoveto.Web.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Penzkoveto.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/account")]
    public class AccountController : PenzKovetoControllerBase
    {
        private readonly IConfiguration config;
        private readonly SignInManager<PenzKoveto.Repository.Models.ApplicationUser> signInManager;
        private readonly IAuthRepository authRepository;

        public AccountController(IAuthRepository authRepository, IConfiguration configuration, SignInManager<PenzKoveto.Repository.Models.ApplicationUser> signInManager)
        {
            this.authRepository = authRepository;
            this.config = configuration;
            this.signInManager = signInManager;
        }

        [AllowAnonymous]
        [Route("Register")]
        [HttpPost]
        public async Task<ActionResult> Register(UserCreateModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var model = new PenzKoveto.Repository.Models.UserModel
            {
                UserName = userModel.UserName,
                Password = userModel.Password
            };

            var result = await authRepository.CreateUser(model);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();
            var user = await AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        [HttpGet]
        [Route("me")]
        public async Task<ActionResult> GetCurrentUser()
        {
            var user = await authRepository.GetUserByName(CurrentUserName);
            if (user == null)
            {
                return NotFound();
            }

            var vm = new UserModel
            {
                Id = user.Id,
                UserName = user.UserName
            };

            return Ok(vm);
        }

        private string GenerateJSONWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sid, userInfo.Id),
                new Claim("username", userInfo.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(config["Jwt:Issuer"],
              config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<UserModel> AuthenticateUser(LoginModel login)
        {
            var result = await signInManager.PasswordSignInAsync(login.UserName, login.Password, false, false);

            if (!result.Succeeded)
            {
                return null;
            }

            var user = await authRepository.GetUserByName(login.UserName);

            return new UserModel
            {
                Id = user.Id,
                UserName = user.UserName
            };
        }
    }
}