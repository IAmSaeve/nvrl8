using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nvrl8_ws.Model
{
    public class Settings
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string GoTime { get; set; }
        public string AwakeTime { get; set; }
        public string OriginX { get; set; }
        public string OriginY { get; set; }
        public string UseBus { get; set; }

        public Settings(int id, string origin, string destination, string goTime, string awakeTime, string originX, string originY, string useBus)
        {
            Id = id;
            Origin = origin;
            Destination = destination;
            GoTime = goTime;
            AwakeTime = awakeTime;
            OriginX = originX;
            OriginY = originY;
            UseBus = useBus;
        }

        public Settings()
        {

        }
    }
}
