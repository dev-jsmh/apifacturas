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
    [Migration("20240926190456_Added image property to ProductEntity.")]
    partial class AddedimagepropertytoProductEntity
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
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("billEntityid")
                        .HasColumnType("int");

                    b.Property<int>("productid")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.Property<double>("totalValue")
                        .HasColumnType("double");

                    b.Property<double>("unitValue")
                        .HasColumnType("double");

                    b.HasKey("id");

                    b.HasIndex("billEntityid");

                    b.HasIndex("productid");

                    b.ToTable("billDetails");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.BillEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("clientid")
                        .HasColumnType("int");

                    b.Property<DateTime>("date")
                        .HasColumnType("datetime");

                    b.Property<double?>("discount")
                        .HasColumnType("double");

                    b.Property<double>("subTotal")
                        .HasColumnType("double");

                    b.Property<double>("totalValue")
                        .HasColumnType("double");

                    b.HasKey("id");

                    b.HasIndex("clientid");

                    b.ToTable("bills");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.ClientEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("lastnames")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("names")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("id");

                    b.ToTable("clients");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.ProductEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("imageUrl")
                        .HasColumnType("longtext");

                    b.Property<string>("model")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("name")
                        .HasColumnType("varchar(255)");

                    b.Property<double?>("price")
                        .HasColumnType("double");

                    b.Property<int?>("stock")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("products");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.BillDetailEntity", b =>
                {
                    b.HasOne("apicsharpfacturas.Models.BillEntity", "billEntity")
                        .WithMany("details")
                        .HasForeignKey("billEntityid");

                    b.HasOne("apicsharpfacturas.Models.ProductEntity", "product")
                        .WithMany()
                        .HasForeignKey("productid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("billEntity");

                    b.Navigation("product");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.BillEntity", b =>
                {
                    b.HasOne("apicsharpfacturas.Models.ClientEntity", "client")
                        .WithMany("bills")
                        .HasForeignKey("clientid");

                    b.Navigation("client");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.BillEntity", b =>
                {
                    b.Navigation("details");
                });

            modelBuilder.Entity("apicsharpfacturas.Models.ClientEntity", b =>
                {
                    b.Navigation("bills");
                });
#pragma warning restore 612, 618
        }
    }
}