using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PusherServer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace messages_dotnet.Controllers
{
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private readonly Entities.Options.Pusher _pusherOptions;

        public MessagesController(IOptionsMonitor<Entities.Options.Pusher> pusherOptionsAccessor)
        {
            _pusherOptions = pusherOptionsAccessor.CurrentValue;
        }

        [HttpGet]
        [Route("auth")]
        public ActionResult Auth([FromQuery]string channel_name, [FromQuery]string socket_id)
        {
            var pusher = new Pusher(_pusherOptions.PUSHER_APP_ID, _pusherOptions.PUSHER_KEY, _pusherOptions.PUSHER_SECRET);
            var auth = pusher.Authenticate(channel_name, socket_id);
            var json = auth.ToJson();
            return new ContentResult { Content = json, ContentType = "application/json" };
        }
    }
}