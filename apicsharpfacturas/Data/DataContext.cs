using System;
using System.Data.Common;
using apicsharpfacturas.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;



namespace apicsharpfacturas.Data
{


	//  class to create tables in the data base
	public class DataContext : DbContext
	{
		public readonly IConfiguration Configuration = null;
		// connection string 

		/*
				public DataContext(IConfiguration configuration)
				{

					this.Configuration = configuration;
				}*/


		public DataContext( DbContextOptions<DataContext> options) : base(options)
		{

		}
		/*
				protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
				{
					var connectionString = this.Configuration.GetConnectionString("DefaultConnection");
					optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version()));
				}*/
		/*
				protected override void OnModelCreating( ModelBuilder modelBuilder)
				{

				}*/

		// add the entities to create the tables in the data base
		public DbSet<ProductEntity> products { get; set; }
		public DbSet<ClientEntity> clients { get; set; }

		// =========== billing ===========
		public DbSet<BillEntity> bills { get; set; }
		public DbSet<BillDetailEntity> billDetails { get; set; }

	}


}

