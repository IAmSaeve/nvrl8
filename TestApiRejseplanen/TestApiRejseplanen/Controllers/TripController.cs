using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestApiRejseplanen.Model;

namespace TestApiRejseplanen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : Controller
    {
        List<Trip> TripList = new List<Trip>(){

            new Trip(
                new List<Leg>{new Leg("A202", "BUS"), new Leg("Til fods", "WALK")},
                new Origin("Maglegårdsvej 2", "ADR",0,"18:00","26-11-2018"),
                new Destination("Rampelyset 32","ADR",0,"18:15","26-11-2018"))

        };

        [HttpGet]
        public IList<Trip> Get()
        {
            return TripList;
        }
    }
}