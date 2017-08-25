using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ExploreJogjaAPI.Models.User
{
    public class UserRoleEntity : IdentityRole<Guid>
    {
        public UserRoleEntity() : base() { }

        public UserRoleEntity(string roleName) : base(roleName) { }
    }
}
