using Microsoft.AspNetCore.Mvc;
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
        public IActionResult Create(ProductAddRequest model)
        {

            int id = 0;

            try
            {
            id = _service.Add(model);

            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return StatusCode(201, id);
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
