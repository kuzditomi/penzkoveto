using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Penzkoveto.Web.Controllers
{
    public class PenzKovetoControllerBase: ControllerBase
    {
        public string CurrentUserId
        {
            get
            {
                return User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid).Value;
            }
        }

        public string CurrentUserName
        {
            get
            {
                return User.Claims.FirstOrDefault(c => c.Type == "username").Value;
            }
        }
    }
}