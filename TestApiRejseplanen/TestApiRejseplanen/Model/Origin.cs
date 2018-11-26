using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApiRejseplanen.Model
{
    public class Origin
    {
        private string _type;

        public string Name { get; set; }
        public string Type { get => _type;
        set {
                if (value.ToUpper() == "ST" ||
                    value.ToUpper() == "ADR" ||
                    value.ToUpper() == "POI")
                {
                    _type = value;
                }
                else
                {
                    throw new ArgumentException("Invalid type");
                }
        }}
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
