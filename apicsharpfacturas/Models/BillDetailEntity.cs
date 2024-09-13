

using System.ComponentModel.DataAnnotations.Schema;

namespace apicsharpfacturas.Models
{
    public class BillDetailEntity { 
   
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public BillEntity? billEntity { get; set; }
        public ProductEntity? product { get; set; }
        public int? quantity { get; set; }
        public double? unitValue { get; set; }
        public double? totalValue { get; set; }
    }
}