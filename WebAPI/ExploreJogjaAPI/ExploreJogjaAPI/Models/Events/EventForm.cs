using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ExploreJogjaAPI.Models.Events
{
    public class EventForm
    {
        [Required]
        [Display(Name = "name", Description = "Title of the event")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "location", Description = "Location of the event")]
        public string Location { get; set; }

        public string Description { get; set; }

        [Required]
        [Display(Name = "from", Description = "Start time of the event")]
        public DateTime From { get; set; }

        [Required]
        [Display(Name = "to", Description = "End time of the event")]
        public DateTime To { get; set; }

        public DateTime Expire { get; set; }

    }
}
