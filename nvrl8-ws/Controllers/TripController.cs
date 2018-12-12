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
                await Task.Run(async () =>
                {
                    TripController tc = new TripController();
                    Trip shortestTrip = null;
                    List<Trip> de = tc.GetTrip().Result.TripListe; // Get TripListe med nuværende settings
                    Trip pickedTrip = null;
                    int matchCount = 0;
                    using (HttpClient client = new HttpClient())
                    {

                        string contents = await client.GetStringAsync(SettingsURI);
                        List<Settings> settings = new List<Settings>();
                        settings = JsonConvert.DeserializeObject<List<Settings>>(contents);
                        setting = settings.First();
                    }

                    foreach (var trip in de)
                    {
                        foreach (var l in trip.Legs)
                        {
                            if (l.Origin.Time == setting.GoTime) // Hvis GoTime matcher første Origins GoTime er det det rigtige trip
                            {
                                matchCount++;
                                pickedTrip = trip;
                            }
                        }
                    }

                    // pickedTrip.Cancelled = true; // Sættest til true for at simulere at din rejse er aflyst
                    var RtTimeDif = DateTime.Parse(pickedTrip.Legs.Last().Destination.RtTime)
                        .Subtract(DateTime.Parse(setting.ArrivalTime));
                    if (pickedTrip != null && (pickedTrip.Cancelled)) // Hvis dit trip er aflyst
                    {
                        Debug.WriteLine("Trip cancelled - picking new");
                        SettingController sc = new SettingController();
                        setting = sc.GetAllSettings().First();
                        //de.Find(x => x. x.Legs.Find(y => y.Origin.Time == setting.GoTime);
                        if (de != null)
                            foreach (var t in de) // Tjekker om der er et Trip med kortere travel-time
                            {
                                if (!t.Cancelled)
                                {
                                    Debug.WriteLine("travel time : " + t.GetTravelTime().ToString());
                                    if (shortestTrip == null)
                                    {
                                        shortestTrip = t;
                                    }
                                    TimeSpan duration = new TimeSpan();
                                    // int TravelHours = Convert.ToInt32(Legs.Last().Destination.Time.Split(':')[0]) - Convert.ToInt32(Legs.First().Origin.Time.Split(':')[0]);
                                    duration = DateTime.Parse(t.Legs.Last().Destination.Time).Subtract(DateTime.Parse(setting.ArrivalTime));
                                    Debug.WriteLine("time diff from arrival: " + duration);
                                    Debug.WriteLine("current time diff: " + DateTime.Parse(shortestTrip.Legs.Last().Destination.Time)
                                        .Subtract(DateTime.Parse(setting.ArrivalTime)));
                                    if (duration > DateTime.Parse(shortestTrip.Legs.Last().Destination.Time) // Vælger det trip med destinationTime tættest på ArrivalTime
                                            .Subtract(DateTime.Parse(setting.ArrivalTime)))
                                    {
                                        shortestTrip = t;
                                    }
                                    //if (t.GetTravelTime() < shortestTrip.GetTravelTime()) // Vælger det trip med kortest total travel time
                                    //{
                                    //    shortestTrip = t;
                                    //}
                                }
                            }
                        
                        if (shortestTrip != null && (setting.GoTime != shortestTrip.Legs.First().Origin.Time || // Opdaterer GoTime med ny rejse
                                                     setting.Origin != shortestTrip.Legs.First().Name))
                        {
                            setting.GoTime = shortestTrip.Legs.First().Origin.Time;
                            sc.UpdateSettings(1, setting);
                            Debug.WriteLine("trip cancelled, settings updated");
                        }
                    }
                });
                Thread.Sleep(60000);
            }
        }

        string SettingsURI = "https://nvrl8-wskev.azurewebsites.net/api/setting";
        public Settings setting = new Settings();

        // GET: api/Trip
        [HttpGet]
        public async Task<Triplist> GetTrip()

        {
            
            string uri;
            using (HttpClient client = new HttpClient())
            {

                string contents = await client.GetStringAsync(SettingsURI);
                List<Settings> settings = new List<Settings>();
                settings = JsonConvert.DeserializeObject<List<Settings>>(contents);
                setting = settings.First();
                uri = "http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
                      "trip?originCoordX=" + setting.OriginX + "&originCoordY=" + setting.OriginY + "&originCoordName=" + setting.Origin +
                      "&destId=" + setting.Destination + "&date=" + DateTime.Now.ToString("dd/MM/yy").Replace("-", ".") + "&time=" + setting.ArrivalTime + "&searchForArrival=1&useBus=1&format=json";
                Debug.WriteLine(uri);
                Debug.WriteLine(setting.ArrivalTime);
                Debug.WriteLine(setting.GoTime);
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
