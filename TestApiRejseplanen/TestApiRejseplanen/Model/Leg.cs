using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApiRejseplanen.Model
{
    public class Leg
    {
        private string _type;

        public string Name { get; set; }

        public string Type
        {
            get => _type;
            set
            {
                if (value.ToUpper() == "IC" ||
                    value.ToUpper() == "LYN" ||
                    value.ToUpper() == "REG" ||
                    value.ToUpper() == "S" ||
                    value.ToUpper() == "TOG" ||
                    value.ToUpper() == "BUS" ||
                    value.ToUpper() == "EXB" ||
                    value.ToUpper() == "NB" ||
                    value.ToUpper() == "TB" ||
                    value.ToUpper() == "F" ||
                    value.ToUpper() == "M" ||
                    value.ToUpper() == "WALK" ||
                    value.ToUpper() == "BIKE" ||
                    value.ToUpper() == "CAR")
                {
                    _type = value;
                }
                else
                {
                    throw new ArgumentException("Invalid type");
                }
            }
        }

        public Leg(string name, string type)
        {
            Name = name;
            Type = type;
        }
    }
}
