using ProductApi.Models.Domain.Categories;
using System.ComponentModel.DataAnnotations;

namespace ProductApi.Models.Request.Products
{
    public class ProductAddRequest
    {
        [Required]
        [StringLength(200, MinimumLength =1)]
        public string? Name { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int CategoryId { get; set; }
    }
}
