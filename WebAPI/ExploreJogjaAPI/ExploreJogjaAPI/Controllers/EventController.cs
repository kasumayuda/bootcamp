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

namespace ExploreJogjaAPI.Controllers
{
    [Route("/[controller]")]    
    public class EventController : Controller
    {

        private readonly IEventService _eventService;

        public EventController(
            IEventService eventService
            ) {
            _eventService = eventService;
        }

        [HttpGet("{eventId}", Name = nameof(GetEventByIdAsync))]
        public async Task<IActionResult> GetEventByIdAsync(Guid eventId, CancellationToken ct) {
            var eventData = await _eventService.GetEventAsync(eventId, ct);
            if (eventData == null) {
                return NotFound();
            }

            return Ok(eventData);
        }

        [AllowAnonymous]
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
