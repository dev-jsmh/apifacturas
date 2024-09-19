
using System.ComponentModel.DataAnnotations.Schema;

namespace apicsharpfacturas.Models
{
    public class BillEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public DateTime date { get; set; }
        public ClientEntity? client { get; set; }
        public double subTotal { get; set; }
        public double? discount { get; set; }
        public double totalValue { get; set; }
       public List<BillDetailEntity> details { get; set; }
    } 

}