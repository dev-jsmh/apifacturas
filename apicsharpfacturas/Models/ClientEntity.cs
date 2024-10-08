



using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.SignalR;

namespace apicsharpfacturas.Models
{
    public class ClientEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Column(TypeName = "varchar(255)")]
        public string names { get; set; }
        [Column(TypeName = "varchar(255)")]
        public string lastnames { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public List<BillEntity> bills { get; set; }
        // indicates if a client is no more active in the platform. 
        // in

    }
}