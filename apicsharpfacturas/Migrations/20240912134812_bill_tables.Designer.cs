﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using apicsharpfacturas.Data;

#nullable disable

namespace apicsharpfacturas.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240912134812_bill_tables")]
    partial class bill_tables
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("apicsharpfacturas.Models.BillDetailEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("billDetails");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.BillEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("bills");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.ClientEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("lastnames")
                        .HasColumnType("longtext");

                    b.Property<string>("names")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.ToTable("clients");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.ProductEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("ClientEntityid")
                        .HasColumnType("int");

                    b.Property<string>("model")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("name")
                        .HasColumnType("varchar(255)");

                    b.Property<double?>("price")
                        .HasColumnType("double");

                    b.HasKey("id");

                    b.HasIndex("ClientEntityid");

                    b.ToTable("products");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.ProductEntity", b =>
                {
                    b.HasOne("apicsharpfacturas.Models.ClientEntity", null)
                        .WithMany("products")
                        .HasForeignKey("ClientEntityid");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.ClientEntity", b =>
                {
                    b.Navigation("products");
                });
#pragma warning restore 612, 618
        }
    }
}