﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ExploreJogjaAPI.Controllers
{
    [Route("/")]
    //[ApiVersion("1.0")]
    public class RootController : Controller
    {
        [HttpGet(Name =(nameof(GetRoot)))]
        public IActionResult GetRoot() {
            var response = new {
                href=Url.Link(nameof(GetRoot), null),
            };

            return Ok(response);
        }

    }
}
