using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using ExploreJogjaAPI.Models;
using ExploreJogjaAPI.Models.Events;

namespace ExploreJogjaAPI.Services.Events
{
    public interface IEventService
    {
        Task<Event> GetEventAsync(
            Guid id,
            CancellationToken ct);

        Task<PagedResults<Event>> GetEventsAsync(
           PagingOptions pagingOptions,
           SortOptions<Event, EventEntity> sortOptions,
           SearchOptions<Event, EventEntity> searchOptions,
           CancellationToken ct);

        Task<Guid> CreateEventAsync(
            string name, 
            string location, 
            string description, 
            DateTime from, 
            DateTime to, 
            DateTime expire, 
            CancellationToken ct);
    }
}
