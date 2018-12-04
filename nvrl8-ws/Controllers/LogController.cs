using System;
using System.Collections.Generic;
using System.Data;
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
    public class LogController : ControllerBase
    {
        private static string ConnectionString =
            "Server=tcp:nvrl8.database.windows.net,1433;Initial CataLog=nvrl8;Persist Security Info=False;User ID=nvrl8admin;Password=p@$$W0RD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
       
        // GET: api/Log
        [HttpGet]

        public List<Log> Get()
        {
            List<Log> LogList = new List<Log>();
            string sql = "SELECT * FROM Log";

            using (SqlConnection DBConnection = new SqlConnection(ConnectionString))
            {
                using (SqlCommand SelectCommand = new SqlCommand(sql, DBConnection))
                {
                  
                    DBConnection.Open();
                    using (SqlDataReader reader = SelectCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {

                            while (reader.Read())
                            {
                                var log = new Log(reader.GetInt32(0), reader.GetString(1));
                                LogList.Add(log);
                            }

                        }
                    }

                }
            }
            return LogList;
        }


        // GET: api/Log/5
        [HttpPost]
        public int AddLog([FromBody] Log log)
        {
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                string SqlQuery = "INSERT INTO Log(ID, LogString) VALUES (@ID, @LogString)";
                using (SqlCommand cmd = new SqlCommand(SqlQuery, con))
                {
                    cmd.Parameters.AddWithValue("@ID", log.ID);
                    cmd.Parameters.AddWithValue("@LogString", log.LogString);
                    

                    int RowsAffected = cmd.ExecuteNonQuery();



                    return RowsAffected;

                }
            }
        }

        [HttpGet("{ID}")]
        public Log GetLogData(int ID)
        {
            Log Log = new Log();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {

                string sqlQuery = "SELECT * FROM Log WHERE Id=@ID ";
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                cmd.Parameters.AddWithValue("@ID", ID);
                con.Open();
                
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Log = new Log(reader.GetInt32(0), reader.GetString(1));
                }
            }
            return Log;
        }

        // PUT: api/Log/5
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
