using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
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
    public class TList
    {
        public Triplist Triplist { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        public async void CheckTrip()
        {
            while (true) // Loop til at tjekke 
            {
                await Task.Run(() =>
                {
                    TripController tc = new TripController();
                    Trip shortestTrip = null;
                    TimeSpan shortestTravel = new TimeSpan(10, 0, 0);
                    List<Trip> de = tc.GetTrip().Result.TripListe; // Get TripListe med nuværende settings
                    Trip pickedTrip = null;
                    foreach (var trip in de)
                    {
                        Debug.WriteLine("list count where time match : " + trip.Legs.Count(y => y.Origin.Time == setting.GoTime));
                        if (trip.Legs.Count(y => y.Origin.Time == setting.GoTime)>0)
                        {
                            pickedTrip = trip;
                        }
                    }
                    Debug.WriteLine("picked trip : " + pickedTrip.ToString());
                    if (pickedTrip != null && pickedTrip.Cancelled)
                    {
                        //de.Find(x => x. x.Legs.Find(y => y.Origin.Time == setting.GoTime);
                        if (de != null)
                            foreach (var t in de) // Tjekker om der er et Trip med kortere travel-time
                            {
                                Debug.WriteLine("travel time : " + t.GetTravelTime().ToString());
                                if (shortestTrip == null)
                                {
                                    shortestTravel = t.GetTravelTime();
                                    shortestTrip = t;
                                }

                                if (t.GetTravelTime() < shortestTrip.GetTravelTime())
                                {
                                    shortestTravel = t.GetTravelTime();
                                    shortestTrip = t;
                                }
                            }

                        Debug.WriteLine("shortest travel " + shortestTravel);
                        SettingController sc = new SettingController();
                        setting = sc.GetAllSettings().First();
                        if (shortestTrip != null && (setting.GoTime != shortestTrip.Legs.First().Origin.Time || // Opdaterer GoTime med ny rejse
                                                     setting.Origin != shortestTrip.Legs.First().Name))
                        {
                            setting.GoTime = shortestTrip.Legs.First().Origin.Time;
                            sc.UpdateSettings(1, setting);
                            Debug.WriteLine("trip cancelled, settings updated");
                        }
                    }
                });
                Thread.Sleep(6000);
            }
        }

        string SettingsURI = "https://nvrl8.azurewebsites.net/api/setting";
        public Settings setting = new Settings();

        // GET: api/Trip
        [HttpGet]
        public async Task<Triplist> GetTrip()

        {
            
            string uri;
            using (HttpClient client = new HttpClient())
            {

                string contents = await client.GetStringAsync(SettingsURI);
                setting = JsonConvert.DeserializeObject<Settings>(contents);
                uri = "http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
                      "trip?originCoordX=" + setting.OriginY + "&originCoordY=" + setting.OriginX + "&originCoordName=" + setting.Origin +
                      "&destId=" + setting.Destination + "&date=" + DateTime.Now.ToString("dd/MM/yy").Replace("-", ".") + "&time=" + setting.ArrivalTime + "&searchForArrival=1&useBus=1&format=json";

                string content = await client.GetStringAsync(uri);
                TList tList = JsonConvert.DeserializeObject<TList>(content);
                return tList.Triplist;

                //var tripList = new Triplist();
                

              


                //string tripContent = await client.GetStringAsync(uri);
                //var t = new Triplist(JsonConvert.DeserializeObject<List<Trip>>(tripContent));
                //Debug.WriteLine("\n \n" + t.TripListe[0].Legs[0] + "\n \n");

                //Console.WriteLine($"{tripLis.TripListe.Alternative}, {tripLis.TripListe.Valid}, {tripLis.TripListe.Cancelled}");
                //foreach (var tripLeg in tripLis.TripListe?.Legs)
                //{
                    //Console.Clear();
                    //Console.WriteLine(tripLeg);
                    // Console.WriteLine($"{TripLeg.Origin}, {TripLeg.Destination}, {TripLeg.Name}, {TripLeg.Type}");
                //}
                //return tripList;
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
