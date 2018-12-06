using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nvrl8_ws.Model;

namespace nvrl8_ws.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static string ConnectionString =
            "Server=tcp:nvrl8.database.windows.net,1433;InitialCataLog=nvrl8;PersistSecurityInfo=False;UserID=nvrl8admin;Password=p@$$W0RD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;ConnectionTimeout=30;";

        // GET api/values/5
        [HttpGet("{email}")]
        public IActionResult GetUserData(string email)
        {
            User user = new User();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {

                string sqlQuery = "SELECT * FROM Users WHERE Email=@Origin";
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                cmd.Parameters.AddWithValue("@Origin", email);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    user = new User(reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetInt32(3), reader.GetInt32(4));
                }
            }
            return Ok(user);
        }

        // POST api/values
        [HttpPost]
        public int AddUser([FromBody] User u)
        {
            //string SqlQuerySettings = "INSERT INTO Settings(Origin, Destination, OriginX, OriginX, UseBus, GoTime, AwakeTime) VALUES (@Origin, @Destination, @OriginX, @OriginX, @UseBus, @GoTime, @AwakeTime)";
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                string SqlQuery = "INSERT INTO Users(Email, Name, ImageURL, SettingsID, LogID) VALUES(@Email, @Name, @ImageURL, @SettingsID, @LogID)";
                using (SqlCommand cmd = new SqlCommand(SqlQuery, con))
                {
                    //cmd.CommandText = SqlQueryUsers;
                    cmd.Parameters.AddWithValue("@Email", u.Email);
                    cmd.Parameters.AddWithValue("@Name", u.Name);
                    cmd.Parameters.AddWithValue("@ImageURL", u.ImageURL);
                    cmd.Parameters.AddWithValue("@SettingsID", u.SettingsID);
                    cmd.Parameters.AddWithValue("@LogID", u.LogID);

                    /*
                    cmd.CommandText = SqlQuerySettings;
                    cmd.Parameters.AddWithValue("@Origin", set.Origin);
                    cmd.Parameters.AddWithValue("@Destination", set.Destination);
                    cmd.Parameters.AddWithValue("@OriginX", set.OriginX);
                    cmd.Parameters.AddWithValue("@OriginY", set.OriginY);
                    cmd.Parameters.AddWithValue("@UseBus", set.UseBus);
                    cmd.Parameters.AddWithValue("@GoTime", set.GoTime);
                    cmd.Parameters.AddWithValue("@AwakeTime", set.AwakeTime);
                    */
                    int RowsAffected = cmd.ExecuteNonQuery();
                    return RowsAffected;
                }
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
