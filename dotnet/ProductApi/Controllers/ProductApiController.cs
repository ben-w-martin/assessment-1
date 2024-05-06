using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging.Abstractions;
using ProductApi.Models.Domain.Products;
using ProductApi.Models.Request.Products;
using ProductApi.Services;

namespace ProductApi.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductApiController : ControllerBase
    {
        ProductService _service;
        IConfiguration _config;

        public ProductApiController(IConfiguration config

           )
        {
            _config = config;

            _service = new ProductService(config);

        }


        [HttpGet]
        public List<Product> GetAllProducts()
        {

            List<Product> products;

            products = _service.GetAll();

            return products;

        }

        [HttpPost]
        public int Create(ProductAddRequest model)
        {

            int id = 0;

            id = _service.Add(model);

            return id;

        }

        [HttpPut("{id:int}")]
        public void UpdateById(ProductUpdateRequest model, int id)
        {
            model.Id = id;

            _service.Update(model);
        }

        [HttpDelete("{id:int}")]
        public void DeleteById( int id)
        {

            _service.Delete(id);
        }
    }
}
