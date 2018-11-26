using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApiRejseplanen.Model
{
    public class Trip
    {
        public List<Trip> TripList { get; set; }
        public List<Leg> Legs { get; set; }
        public Origin Origin { get; set; }
        public Destination Destination { get; set; }

        public Trip(List<Trip> tripList, List<Leg> legs, Origin origin, Destination destination)
        {
            TripList = tripList;
            Legs = legs;
            Origin = origin;
            Destination = destination;
        }
    }
}
