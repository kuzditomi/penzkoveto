using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Repository
{
    public interface IAuthRepository
    {
        Task<IdentityResult> CreateUser(UserModel userModel);

        Task<ApplicationUser> GetUserByName(string username);
    }
}
