using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ExploreJogjaAPI.Models.Events;
using ExploreJogjaAPI.Models;

namespace ExploreJogjaAPI.Infrastructure
{
    public class MappingProfile : Profile
    {

        public MappingProfile() {
            CreateMap<EventEntity, Event>();
            //    .ForMember(dest => dest.Openings, opt => opt.MapFrom(src =>
            //    Link.To(nameof(Controllers.EventController.GetEventsHomePageAsync))));
                
        }

    }
}
