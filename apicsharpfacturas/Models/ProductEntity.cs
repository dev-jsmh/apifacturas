﻿

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

		// public int? stock { get; set; }

		public ICollection<ClientEntity> clients = new List<ClientEntity>();

		// --- public List<ClientEntity> clients { get; set; } = new List<ClientEntity>();



	}
}

