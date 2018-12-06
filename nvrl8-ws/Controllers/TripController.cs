using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nvrl8_ws.Controllers;
using nvrl8_ws.Model;
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
        public static async Task<IList<Triplist>> Get()
        {  
            string SettingsURI = "https://nvrl8.azurewebsites.net/api/setting";


            using (HttpClient client = new HttpClient())
            {
                string content = await client.GetStringAsync(SettingsURI);
                IList<Settings> settingsListe = JsonConvert.DeserializeObject<IList<Settings>>(content);

                foreach (var settings in settingsListe)
                {
                    Console.WriteLine($"{settings.Id} {settings.Origin} {settings.Destination} {settings.OriginX} {settings.OriginY} {settings.GoTime} {settings.AwakeTime} {settings.UseBus}");

                    int id = settings.Id;
                    string origin = settings.Origin;
                    string destination = settings.Destination;
                    string originX = settings.OriginX;
                    string originY = settings.OriginY;
                    string goTime = settings.GoTime;
                    string awakeTime = settings.AwakeTime;
                    int useBus = settings.UseBus;
                }
               

            }

            string uri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/trip?originId=8600617" +
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
