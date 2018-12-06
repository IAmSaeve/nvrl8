using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RejseplanAPI.Model
{
    public class Origin
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public int RouteIdx { get; set; }
        public string Time { get; set; }
        public string RtTime { get; set; }
        public string Date { get; set; }
        public string RtDate { get; set; }
        public string RtTrack { get; set; }
        public string Track { get; set; }

        public Origin(string name, string type, string time, string date, string track, string rtTime = null, int routeIdx = 0, string rtDate = null, string rtTrack = null)
        {
            Name = name;
            Type = type;
            RouteIdx = routeIdx;
            Time = time;
            RtTime = rtTime;
            Date = date;
            RtDate = rtDate;
            RtTrack = rtTrack;
            Track = track;
        }
    }
}
