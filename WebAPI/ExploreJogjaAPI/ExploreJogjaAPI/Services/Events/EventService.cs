using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ExploreJogjaAPI.Models;
using ExploreJogjaAPI.Models.Events;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace ExploreJogjaAPI.Services.Events
{
    public class EventService : IEventService {

        private readonly ExploreJogjaAPIContext _context;

        public EventService(
            ExploreJogjaAPIContext context
            ) {
            _context = context;
        }

        public async Task<Event> GetEventAsync(Guid id, CancellationToken ct) {
            var entity = await _context.EventsList.FirstOrDefaultAsync(x=>x.EventID == id, ct);
            if (entity == null) {
                return null;
            }

            return Mapper.Map<Event>(entity);
        }

        public Task<PagedResults<Event>> GetEventsAsync(PagingOptions pagingOptions, SortOptions<Event, EventEntity> sortOptions, SearchOptions<Event, EventEntity> searchOptions, CancellationToken ct) {
            throw new NotImplementedException();
        }

        public async Task<Guid> CreateEventAsync(
            string name,
            string location,
            string description,
            DateTime from,
            DateTime to,
            DateTime expire,
            CancellationToken ct) {

            var eventId = Guid.NewGuid();

            var newEvent = _context.EventsList.Add(new EventEntity() {
                Name = name,
                Location = location,
                Description = description,
                From = from.ToUniversalTime(),
                To = to.ToUniversalTime(),
                Expire = expire
            });

            var created = await _context.SaveChangesAsync(ct);

            return eventId;
        }
    }
}
