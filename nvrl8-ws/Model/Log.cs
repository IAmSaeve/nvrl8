using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nvrl8_ws.Model
{
    public class Log
    {
        public int ID { get; set; }
        public string LogString { get; set; }

        public Log(int id, string LogString)
        {
            ID = id;
            LogString = LogString;
        }

        public Log()
        {
            
        }
    }
}
