

using System.ComponentModel.DataAnnotations.Schema;

namespace apicsharpfacturas.Models
{
	public class ProductEntity
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int id { get; set; }
		[Column(TypeName = "varchar(255)")]
		public string? name { get; set; }
		[Column(TypeName = "varchar(255)")]
		public string? model { get; set; }
		public double? price { get; set; }
		public int? stock { get; set; }
		public string? imagePath { get; set; } 
		public bool? isDeleted { get; set; }

	}
}

