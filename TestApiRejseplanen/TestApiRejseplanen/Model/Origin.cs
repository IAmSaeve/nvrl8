using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApiRejseplanen.Model
{
    public class Origin
    {

        public string  Name { get; set; }
        public string  Type { get; set; }
        public int RouteIdx { get; set; }
        public string Time { get; set; }
        public string Date { get; set; }

        public Origin(string name, string type, int routeIdx, string time, string date)
        {
            Name = name;
            Type = type;
            RouteIdx = routeIdx;
            Time = time;
            Date = date;
        }
    }
}
