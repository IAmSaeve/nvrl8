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


        public Trip(List<Leg> legs, bool alternative=false, bool valid=true, bool cancelled=false)
        {
            Alternative = alternative;
            Valid = valid;
            Cancelled = cancelled;
            Legs = legs;
        }
    }
}
