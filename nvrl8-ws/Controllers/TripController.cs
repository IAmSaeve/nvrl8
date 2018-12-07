using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;
using nvrl8_ws.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace nvrl8_ws.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        public Triplist Hej { get; set; }

        // GET: api/Trip
        [HttpGet]
        public async Task<Triplist> Gettrip()

        {
            string SettingsURI = "https://nvrl8.azurewebsites.net/api/setting";

            
            string uri;
            using (HttpClient client = new HttpClient())
            {
                var tripLis = new Triplist();
                string content = await client.GetStringAsync(SettingsURI);
                Settings setting = JsonConvert.DeserializeObject<Settings>(content);

                uri = "http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
                          "trip?originCoordX=" + setting.OriginY + "&originCoordY=" + setting.OriginX + "&originCoordName=" + setting.Origin +
                          "&destId=" + setting.Destination + "&date=" + DateTime.Now.ToString("dd/MM/yy").Replace("-", ".") + "&time=" + setting.GoTime + "&searchForArrival=1&useBus=1&format=json";



                string tripContent = await client.GetStringAsync(uri);
                var t = new Triplist(JsonConvert.DeserializeObject<List<Trip>>(tripContent));
                Debug.WriteLine("\n \n" + t.TripListe[0].Legs[0] + "\n \n");

                //Console.WriteLine($"{tripLis.TripListe.Alternative}, {tripLis.TripListe.Valid}, {tripLis.TripListe.Cancelled}");
                //foreach (var tripLeg in tripLis.TripListe?.Legs)
                //{
                    //Console.Clear();
                    //Console.WriteLine(tripLeg);
                    // Console.WriteLine($"{TripLeg.Origin}, {TripLeg.Destination}, {TripLeg.Name}, {TripLeg.Type}");
                //}
                return tripLis;
            }
            // return tripLis;
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
