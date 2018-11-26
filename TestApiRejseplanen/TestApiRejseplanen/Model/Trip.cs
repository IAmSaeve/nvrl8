using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApiRejseplanen.Model
{
    public class Trip
    {
        public bool Alternative { get; set; } = false;
        public bool Valid { get; set; } = true;
        public bool Cancelled { get; set; } = true;
        public List<Leg> Legs { get; set; }
        public Origin Origin { get; set; }
        public Destination Destination { get; set; }

        public Trip(List<Leg> legs, Origin origin, Destination destination)
        {
            Legs = legs;
            Origin = origin;
            Destination = destination;
        }
    }
}
