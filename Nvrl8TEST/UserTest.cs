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
        public void GetAUser()
        {
            // Arrange
            UserController BRO = new UserController();
            // Action
            string result =BRO.GetUserData("sebastian@gmail.com").Name;
            // Assert
            Assert.AreEqual("Sebastian Petersen", result);
        }
    }
}
