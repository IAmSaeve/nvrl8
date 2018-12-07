using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace nvrl8_ws.Model
{
    public class Triplist
    {
        [JsonProperty("Trip")]
        public List<Trip> TripListe { get; set; }

        public Triplist(List<Trip> tripListe)
        {
            TripListe = tripListe;
        }

        public Triplist(){}
    }
}
