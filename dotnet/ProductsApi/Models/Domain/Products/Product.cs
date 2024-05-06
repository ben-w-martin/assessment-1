using Models.Lookups;

namespace ProductsApi.Models.Domain
{
    public class Product
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public decimal Price { get; set; }

        public required Lookup Category { get; set; }
    }

}