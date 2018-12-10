using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nvrl8_ws.Model
{
    public class Leg
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public Origin Origin { get; set; }
        public Destination Destination { get; set; }

        public Leg(string name, string type, Origin origin, Destination destination)
        {
            Name = name;
            Type = type;
            Origin = origin;
            Destination = destination;
        }

        public override string ToString()
        {
            return $"{nameof(Name)}: {Name}, {nameof(Type)}: {Type}, {nameof(Origin)}: {Origin}, {nameof(Destination)}: {Destination}";
        }
    }
}
