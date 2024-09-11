
using System.ComponentModel.DataAnnotations.Schema;

namespace apicsharpfacturas.Models
{
    public class BillEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        private int id { get; set; }
        private ClientEntity? client { get; set; }
        private double subTotal { get; set; }
        private double discount { get; set; }
        private double totalValue { get; set; }

        private ICollection<BillDetailEntity> details = new List<BillDetailEntity>();
    }

}