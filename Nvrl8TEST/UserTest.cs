using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using nvrl8_ws.Controllers;
using nvrl8_ws.Model;

namespace Nvrl8TEST
{
    [TestClass]
    public class UserTest
    {

        [TestMethod]
        public void PostAUser()
        {
            // Arrange
            UserController uc = new UserController();
            User u = new User("louis@gmail.com", "Louis", "smth.jpg", 2,2);
            // Action
            uc.AddUser(u);
            // Assert
            Assert.AreEqual(u,uc.GetAllUsers().Last());
        }
    }
}
