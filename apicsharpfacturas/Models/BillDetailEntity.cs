

using System.ComponentModel.DataAnnotations.Schema;

namespace apicsharpfacturas.Models
{
    public class BillDetailEntity { 
   
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        private int Id { get; set; }
        private BillEntity? billEntity { get; set; }
        private ProductEntity product { get; set; }
        private int quantity { get; set; }
        private double unitValue { get; set; }
        private double totalValue { get; set; }
    }
}