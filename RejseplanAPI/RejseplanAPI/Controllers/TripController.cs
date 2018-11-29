using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RejseplanAPI.Model;

namespace RejseplanAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {


        
        public static async Task<IList<Triplist>> GetTripsAsync()
        {
            string uri  = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/trip?originId=8600617" +
                "&destCoordX=12565562&destCoordY=55673063&destCoordName=K%C3%B8benhavn%20H&date=" + DateTime.Now +
                "&time=10:58&useBus=0&format=json";

            using (HttpClient client = new HttpClient())
            {
                string content = await client.GetStringAsync(uri);
                IList<Triplist> tripList = JsonConvert.DeserializeObject<IList<Triplist>>(content);

                Console.WriteLine(tripList.ToString());
                return tripList;

            }
        }


        // GET: api/Trip
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Trip/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Trip
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Trip/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
