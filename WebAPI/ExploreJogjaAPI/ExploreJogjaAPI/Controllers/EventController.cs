using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExploreJogjaAPI.Models;
using ExploreJogjaAPI.Models.Events;
using System.Threading;
using ExploreJogjaAPI.Services.Events;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Options;
using ExploreJogjaAPI.Infrastructure;

namespace ExploreJogjaAPI.Controllers
{
    [Route("/[controller]")]    
    public class EventController : Controller
    {

        private readonly IEventService _eventService;
        private readonly PagingOptions _defaultPagingOptions;

        public EventController(
            IEventService eventService,
            IOptions<PagingOptions> defaultPagingOptionsAccessor
            ) {
            _eventService = eventService;
            _defaultPagingOptions = defaultPagingOptionsAccessor.Value;
        }

        [HttpGet("GetEventById/{eventId}",Name = nameof(GetEventByIdAsync))]
        public async Task<IActionResult> GetEventByIdAsync(Guid eventId, CancellationToken ct) {
            var eventData = await _eventService.GetEventAsync(eventId, ct);
            if (eventData == null) {
                return NotFound();
            }

            return Ok(eventData);
        }

        [HttpGet("GetHomePageEventList",Name = nameof(GetEventsHomePageAsync))]
        [ResponseCache(CacheProfileName = "Collection",
                       VaryByQueryKeys = new[] { "offset", "limit", "orderBy", "search" })]
        public async Task<IActionResult> GetEventsHomePageAsync(
            [FromQuery] PagingOptions pagingOptions, 
            [FromQuery] SortOptions<Event, EventEntity> sortOptions,
            [FromQuery] SearchOptions<Event, EventEntity> searchOptions,
            CancellationToken ct) {

            if (!ModelState.IsValid) {
                return BadRequest(new ApiError(ModelState));
            }

            pagingOptions.Offset = pagingOptions.Offset ?? _defaultPagingOptions.Offset;
            pagingOptions.Limit = pagingOptions.Limit ?? _defaultPagingOptions.Limit;

            var eventDatas = await _eventService.GetEventsAsync(
                pagingOptions,
                sortOptions,
                searchOptions,
                ct);

            var collection = PagedCollection<Event>.Create<EventResponse>(
                Link.ToCollection(nameof(GetEventsHomePageAsync)),
                eventDatas.Items.ToArray(),
                eventDatas.TotalSize,
                pagingOptions);


            collection.EventQuery = FormMetaData.FromResource<Event>(
                Link.ToForm(
                    nameof(GetEventsHomePageAsync),
                    null,
                    Link.GetMethod,
                    Form.QueryRelation));

            return Ok(collection);
        }

        [Authorize]
        [HttpPost]
        [Route("create", Name = nameof(CreateEventAsync))]
        public async Task<IActionResult> CreateEventAsync(
            [FromBody] EventForm eventForm,
            CancellationToken ct) {

            if (!ModelState.IsValid) {
                return BadRequest(new ApiError(ModelState));
            }

            var eventId = await _eventService.CreateEventAsync(
                eventForm.Name,
                eventForm.Location,
                eventForm.Description,
                eventForm.From,
                eventForm.To,
                eventForm.Expire,
                ct);

            return Created(
                Url.Link(nameof(GetEventByIdAsync),
                new { eventId }),
                null);

        }

    }
}
