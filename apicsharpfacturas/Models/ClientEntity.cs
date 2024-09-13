



using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.SignalR;

namespace apicsharpfacturas.Models
{
    public class ClientEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string? names { get; set; }
        public string? lastnames { get; set; }
        // product bills list
        [JsonIgnore]
        public List<BillEntity>? bills { get; set; }

    }
}