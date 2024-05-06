using Azure;
using Microsoft.AspNetCore.Mvc;

namespace ProductsApi.Controllers;

[ApiController]
[Route("[products]")]
public class ProductsApiController : ControllerBase
{

    private readonly ILogger<ProductsApiController> _logger;


    public ProductsApiController(ILogger<ProductsApiController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public  Get()
    {
       

       
    }
}
