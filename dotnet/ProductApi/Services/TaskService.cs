using Microsoft.Data.SqlClient;
using ProductApi.Models.Domain.Products;
using ProductApi.Models.Domain;
using ProductApi.Models.Request.Products;
using System.Data;
using ProductApi.Models.Domain.Tasks;
using ProductApi.Models.Request.Tasks;

namespace ProductApi.Services
{
    public class TaskService
    {
        IConfiguration _config;
        public TaskService(IConfiguration config)
        {
            _config = config;
        }

        #region GET ALL 
        public List<TaskItem> GetAll()
        {
            List<TaskItem> tasks;


            SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand command = new SqlCommand("[dbo].[Tasks_SelectAll]", connection);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataTable table = new DataTable();
            adapter.Fill(table);

            tasks = new List<TaskItem>();

            for (int i = 0; i < table.Rows.Count; i++)
            {

                TaskItem task = new TaskItem();

                task.Id = (int)table.Rows[i]["Id"];
                task.Item = table.Rows[i]["Item"].ToString();
                task.IsCompleted = (bool)table.Rows[i]["IsCompleted"];


                tasks.Add(task);
            }
            return tasks;

        }
        #endregion

        #region ADD
        public int Add(TaskAddRequest model)
        {
            int id = 0;

            SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand command = new SqlCommand("[dbo].[Tasks_Insert]", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Item", model.Item);

            SqlParameter param = new SqlParameter("@Id", SqlDbType.Int);
            param.Direction = ParameterDirection.Output;

            command.Parameters.Add(param);

            command.ExecuteNonQuery();
            Int32.TryParse(param.Value.ToString(), out id);

            return id;

        }
        #endregion

        #region UPDATE
        public void Update(TaskUpdateRequest model)
        {
            SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand command = new SqlCommand("[dbo].[Tasks_Update]", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id", model.Id);
            command.Parameters.AddWithValue("@Item", model.Item);
            command.Parameters.AddWithValue("@IsCompleted", model.IsCompleted);

            command.ExecuteNonQuery();
        }
        #endregion

        #region DELETE
        public void Delete(int id)
        {
            SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand command = new SqlCommand("[dbo].[Tasks_Delete]", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id", id);

            command.ExecuteNonQuery();
        }
        #endregion


    }
}
