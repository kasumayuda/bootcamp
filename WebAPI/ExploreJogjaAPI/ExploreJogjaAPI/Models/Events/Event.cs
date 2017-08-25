using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExploreJogjaAPI.Models.Events
{
    public class Event : Resource
    {

        public string Name  { get; set; }

        public string Location { get; set; }

        public string Description { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public DateTime Expire { get; set; }


    }
}
