



using System.ComponentModel.DataAnnotations.Schema;

namespace apicsharpfacturas.Models
{
    public class ClientEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string? names { get; set; }
        public string? lastnames { get; set; }

        //  public ICollection<Product> products { get; } = new list<Product>()
        // public List<Product> products { get; set; } = [];
        public ICollection<ProductEntity> products { get; set; } = new List<ProductEntity>();


    }





}