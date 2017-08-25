using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExploreJogjaAPI.Models.User
{
    public class UserEntity : IdentityUser<Guid>
    {
        
        public string Firstname { get; set; }

        public string LastName { get; set; }
        
    }
}
