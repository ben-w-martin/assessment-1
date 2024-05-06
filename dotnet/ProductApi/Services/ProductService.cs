using Microsoft.Data.SqlClient;
using ProductApi.Models.Domain.Products;
using ProductApi.Models.Request.Products;
using System.Data;

namespace ProductApi.Services
{
    public class ProductService
    {
        IConfiguration _config;
        public ProductService(IConfiguration config)
        {
            _config = config;
        }

        #region GET ALL 
        public List<Product> GetAll()
        {
            List<Product> products;


            SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand command = new SqlCommand("[dbo].[Products_SelectAll]", connection);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataTable table = new DataTable();
            adapter.Fill(table);

            products = new List<Product>();

            for (int i = 0; i < table.Rows.Count; i++)
            {

                Product product = new Product();

                product.Id = (int)table.Rows[i]["Id"];
                product.Name = table.Rows[i]["Name"].ToString();
                product.Price = (double)table.Rows[i]["Price"];
                product.Quantity = (int)table.Rows[i]["Quantity"];
                product.Category.Id = (int)table.Rows[i]["CategoryId"];
                product.Category.Name = table.Rows[i]["CategoryName"].ToString();
                product.DateAdded = (DateTime)table.Rows[i]["DateAdded"];
                product.DateModified = (DateTime)table.Rows[i]["DateModified"];

                products.Add(product);
            }
            return products;

        }
        #endregion

        #region ADD
        public int Add(ProductAddRequest model)
        {
            int id = 0;


            SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand command = new SqlCommand("[dbo].[Products_Insert]", connection);
            command.CommandType = CommandType.StoredProcedure;

            AddCommonParams(model, command);

            SqlParameter param = new SqlParameter("@Id", SqlDbType.Int);
            param.Direction = ParameterDirection.Output;

            command.Parameters.Add(param);

            command.ExecuteNonQuery();
            Int32.TryParse(param.Value.ToString(), out id);

            return id;

        }
        #endregion

        #region UPDATE
        public void Update(ProductUpdateRequest model)
        {
            SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand command = new SqlCommand("[dbo].[Products_Update]", connection);
            command.CommandType = CommandType.StoredProcedure;

            AddCommonParams(model, command);

            command.Parameters.AddWithValue("@Id", model.Id);

            command.ExecuteNonQuery();
        }
        #endregion

        #region DELETE
        public void Delete(int id)
        {
            SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand command = new SqlCommand("[dbo].[Products_Delete]", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Id", id);

            command.ExecuteNonQuery();
        }
        #endregion
        private static void AddCommonParams(ProductAddRequest model, SqlCommand command)
        {
            command.Parameters.AddWithValue("@Name", model.Name);
            command.Parameters.AddWithValue("@Price", model.Price);
            command.Parameters.AddWithValue("@Quantity", model.Quantity);
            command.Parameters.AddWithValue("@CategoryId", model.CategoryId);
        }

    }
}
