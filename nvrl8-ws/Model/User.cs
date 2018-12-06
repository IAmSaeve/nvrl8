using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nvrl8_ws.Model
{
    public class User
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public int SettingsID { get; set; }
        public int LogID { get; set; }
        public User(string email, string name, string imageUrl, int settingsId, int logId)
        {
            Email = email;
            Name = name;
            ImageURL = imageUrl;
            SettingsID = settingsId;
            settingsId++;
            LogID = logId;
            logId++;
        }
       

        public User()
        {
            
        }


    }
}
