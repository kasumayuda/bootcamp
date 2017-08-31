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

        /// <summary>
        /// get an event by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        public async Task<Event> GetEventAsync(Guid id, CancellationToken ct) {
            var entity = await _context.EventsList.FirstOrDefaultAsync(x=>x.EventID == id, ct);
            if (entity == null) {
                return null;
            }

            return Mapper.Map<Event>(entity);
        }

        /// <summary>
        /// get event list
        /// </summary>
        /// <param name="pagingOptions"></param>
        /// <param name="sortOptions"></param>
        /// <param name="searchOptions"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        public async Task<PagedResults<Event>> GetEventsAsync(
            PagingOptions pagingOptions, 
            SortOptions<Event, EventEntity> sortOptions, 
            SearchOptions<Event, EventEntity> searchOptions, 
            CancellationToken ct) {

            IQueryable<EventEntity> query = _context.EventsList;
            query = searchOptions.Apply(query);
            query = sortOptions.Apply(query);

            var size = await query.CountAsync(ct);

            var items = await query
                .Skip(pagingOptions.Offset.GetValueOrDefault())
                .Take(pagingOptions.Limit.GetValueOrDefault())
                .ProjectTo<Event>()
                .ToArrayAsync(ct);

            return new PagedResults<Event> {
                Items = items,
                TotalSize = size
            };

        }

        /// <summary>
        /// create new event
        /// </summary>
        /// <param name="name"></param>
        /// <param name="location"></param>
        /// <param name="description"></param>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="expire"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
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
