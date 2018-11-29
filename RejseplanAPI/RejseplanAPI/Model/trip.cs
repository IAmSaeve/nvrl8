using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RejseplanAPI.Model
{
    public class Trip
    {
        public bool Alternative { get; set; }
        public bool Valid { get; set; }
        public bool Cancelled { get; set; }
        public List<Leg> Legs { get; set; }


        public Trip(List<Leg> legs, bool alternative=false, bool valid=true, bool cancelled=true)
        {
            Alternative = alternative;
            Valid = valid;
            Cancelled = cancelled;
            Legs = legs;
        }
    }
}
