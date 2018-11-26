using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApiRejseplanen.Model
{
    public class Trip
    {
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
