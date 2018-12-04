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
        public int SettingsId { get; set; }

        public User(string email, string name, string imageUrl, int settingsId)
        {
            Email = email;
            Name = name;
            ImageURL = imageUrl;
            SettingsId = settingsId;
        }
       

        public User()
        {
            
        }


    }
}
