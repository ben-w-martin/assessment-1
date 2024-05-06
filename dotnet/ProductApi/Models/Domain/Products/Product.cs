using ProductApi.Models.Domain.Categories;
using System.Reflection.Metadata.Ecma335;

namespace ProductApi.Models.Domain.Products
{
    public class Product
    {
        public Product() { 
            this.Category = new Category();
        }

        public int Id { get; set; }

        public string? Name { get; set; }

        public double Price { get; set; }

        public int Quantity { get; set; }

        public Category Category { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime DateModified { get; set; }

    }
}
