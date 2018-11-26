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
            new Trip(new List<Leg>(new Leg("A202", "BUS"), new Leg("Til fods", "walk")), new Origin("Maglegårdsvej 2", "ADR"))
        };

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            await Task.Run(() => {
                
            });
        }
    }
}