



namespace apicsharpfacturas.Models
{
    public class ProductRequest
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? model { get; set; }
        public double? price { get; set; }
        public int? stock { get; set; }
        // image file 
        public IFormFile image { get; set; }
        // image path 
        public string? imageUrl { get; set; }
    }
}
