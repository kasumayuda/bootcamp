﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExploreJogjaAPI.Models.Events
{
    public class EventResponse : PagedCollection<Event> {
        public Form EventQuery { get; set; }
    }
}
