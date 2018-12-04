using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nvrl8_ws.Model;

namespace nvrl8_ws.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private static string conn =
            "Server=tcp:nvrl8.database.windows.net,1433;InitialCatalog=nvrl8;Persist SecurityInfo=False;UserID=nvrl8admin;Password=p@$$W0RD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;ConnectionTimeout=30;";
        // GET: api/Setting
        [HttpGet]
        public Settings GetACustomer(int id)
        {
            using (SqlConnection dbConnection = new SqlConnection(conn))
            {
                dbConnection.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM Settings INNER JOIN Users ON Settings.ID=Users.LogID WHERE ID = @id", dbConnection))
                {
                    command.Parameters.Add(new SqlParameter("id", id));
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            return new Settings(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3));
                        }
                    }
                }

                dbConnection.Close();

                return null;
            }
        }

        // GET: api/Setting/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Setting
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Setting/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
