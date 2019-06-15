using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IServiceProvider serviceProvider;
        private readonly UserManager<ApplicationUser> userManager;

        public AuthRepository(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager)
        {
            this.serviceProvider = serviceProvider;
            this.userManager = userManager;
        }

        public async Task<IdentityResult> CreateUser(UserModel userModel)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                ApplicationUser user = new ApplicationUser
                {
                    UserName = userModel.UserName,
                    Email = userModel.UserName
                };

                var result = await userManager.CreateAsync(user, userModel.Password);

                return result;
            }
        }

        public async Task<ApplicationUser> GetUserByName(string userName)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var user = await userManager.FindByNameAsync(userName);

                return user;
            }
        }
    }
}