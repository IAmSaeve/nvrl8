using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nvrl8_ws.Model
{
    public class Destination
    {
        public string Name{ get; set; }
        public string Type { get; set; }
        public int RouteIdx { get; set; }
        public string Time { get; set; }
        public string RtTime { get; set; }
        public string Date { get; set; }
        public string RtDate { get; set; }
        public string RtTrack { get; set; }
        public string Track { get; set; }

        public Destination(string name, string type, string time, string date,  string track, string rtTime = null, int routeIdx = 0, string rtDate = null, string rtTrack = null)
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

        public override string ToString()
        {
            return $"{nameof(Name)}: {Name}, {nameof(Type)}: {Type}, {nameof(RouteIdx)}: {RouteIdx}, {nameof(Time)}: {Time}, {nameof(RtTime)}: {RtTime}, {nameof(Date)}: {Date}, {nameof(RtDate)}: {RtDate}, {nameof(RtTrack)}: {RtTrack}, {nameof(Track)}: {Track}";
        }
    }
}
