using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace nvrl8_ws.Model
{
    public class Trip
    {
        [JsonProperty("Alternative")]
        public bool Alternative { get; set; }
        [JsonProperty("Valid")]
        public bool Valid { get; set; }
        [JsonProperty("Cancelled")]
        public bool Cancelled { get; set; }
        [JsonProperty("Leg")]
        public List<Leg> Legs { get; set; }

        public TimeSpan GetTravelTime()
        {
            TimeSpan duration = new TimeSpan();
            // int TravelHours = Convert.ToInt32(Legs.Last().Destination.Time.Split(':')[0]) - Convert.ToInt32(Legs.First().Origin.Time.Split(':')[0]);
            duration = DateTime.Parse(Legs.Last().Destination.Time).Subtract(DateTime.Parse(Legs.First().Origin.Time));
            return duration;
        }


        public Trip(List<Leg> legs, bool alternative=false, bool valid=true, bool cancelled=false)
        {
            Alternative = alternative;
            Valid = valid;
            Cancelled = cancelled;
            Legs = legs;
        }

        public override string ToString()
        {
            string legString = "";
            foreach (var l in Legs)
            {
                legString += " " + l.ToString();
            }
            return $"{nameof(Alternative)}: {Alternative}, {nameof(Valid)}: {Valid}, {nameof(Cancelled)}: {Cancelled}, {nameof(Legs)}: {legString}";
        }
    }
}
