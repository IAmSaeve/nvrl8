using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using nvrl8_ws.Controllers;
using nvrl8_ws.Model;
using Newtonsoft.Json;

namespace Nvrl8TEST
{
    [TestClass]
    public class UserTest
    {

        [TestMethod]
        public async Task PostAUser()
        {
            // Arrange
            User u = new User("louis@gmail.com", "Louis", "http://i.imgur.com/LhwqYVS.jpg", 2, 2);
            string uri = "https://nvrl8-wskev.azurewebsites.net/api/user";
            List<User> us = new List<User>();
            // Action
            using (HttpClient client = new HttpClient())
            {
                var jsonStr = JsonConvert.SerializeObject(u);
                StringContent content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync(uri, content);
                await response.Content.ReadAsStringAsync();

            }

            using (HttpClient client = new HttpClient())
            {
                string content = await client.GetStringAsync(uri);
                us = JsonConvert.DeserializeObject<List<User>>(content);
            }
            // Assert
            Assert.AreEqual(u.ToString(), us.Last().ToString());
        }
    }
}
