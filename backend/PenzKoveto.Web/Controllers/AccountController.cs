using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PenzKoveto.Web.Models;
using PenzKoveto.Repository;
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

        // [HttpPost]
        // [Route("refresh")]
        // public IActionResult Refresh(string token, string refreshToken)
        // {
        //     var principal = GetPrincipalFromExpiredToken(token);
        //     var username = principal.Identity.Name;
        //     var savedRefreshToken = GetRefreshToken(username); //retrieve the refresh token from a data store
        //     if (savedRefreshToken != refreshToken)
        //         throw new SecurityTokenException("Invalid refresh token");

        //     var newJwtToken = GenerateJSONWebToken(new UserModel
        //     {
        //         Id = principal.Identity.
        //     });
        //     var newRefreshToken = GenerateRefreshToken();
        //     DeleteRefreshToken(username, refreshToken);
        //     SaveRefreshToken(username, newRefreshToken);

        //     return new ObjectResult(new
        //     {
        //         token = newJwtToken,
        //         refreshToken = newRefreshToken
        //     });
        // }

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

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("the server key used to sign the JWT token is here, use more than 16 chars")),
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
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
              expires: DateTime.Now.AddHours(2),
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