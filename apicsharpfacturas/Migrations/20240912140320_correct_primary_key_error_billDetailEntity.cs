using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apicsharpfacturas.Migrations
{
    /// <inheritdoc />
    public partial class correct_primary_key_error_billDetailEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_products_clients_ClientEntityid",
                table: "products");

            migrationBuilder.DropIndex(
                name: "IX_products_ClientEntityid",
                table: "products");

            migrationBuilder.DropColumn(
                name: "ClientEntityid",
                table: "products");

            migrationBuilder.AddColumn<int>(
                name: "clientid",
                table: "bills",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "discount",
                table: "bills",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "subTotal",
                table: "bills",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "totalValue",
                table: "bills",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "billEntityid",
                table: "billDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "productid",
                table: "billDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "billDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "totalValue",
                table: "billDetails",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "unitValue",
                table: "billDetails",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_bills_clientid",
                table: "bills",
                column: "clientid");

            migrationBuilder.CreateIndex(
                name: "IX_billDetails_billEntityid",
                table: "billDetails",
                column: "billEntityid");

            migrationBuilder.CreateIndex(
                name: "IX_billDetails_productid",
                table: "billDetails",
                column: "productid");

            migrationBuilder.AddForeignKey(
                name: "FK_billDetails_bills_billEntityid",
                table: "billDetails",
                column: "billEntityid",
                principalTable: "bills",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_billDetails_products_productid",
                table: "billDetails",
                column: "productid",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_bills_clients_clientid",
                table: "bills",
                column: "clientid",
                principalTable: "clients",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_billDetails_bills_billEntityid",
                table: "billDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_billDetails_products_productid",
                table: "billDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_bills_clients_clientid",
                table: "bills");

            migrationBuilder.DropIndex(
                name: "IX_bills_clientid",
                table: "bills");

            migrationBuilder.DropIndex(
                name: "IX_billDetails_billEntityid",
                table: "billDetails");

            migrationBuilder.DropIndex(
                name: "IX_billDetails_productid",
                table: "billDetails");

            migrationBuilder.DropColumn(
                name: "clientid",
                table: "bills");

            migrationBuilder.DropColumn(
                name: "discount",
                table: "bills");

            migrationBuilder.DropColumn(
                name: "subTotal",
                table: "bills");

            migrationBuilder.DropColumn(
                name: "totalValue",
                table: "bills");

            migrationBuilder.DropColumn(
                name: "billEntityid",
                table: "billDetails");

            migrationBuilder.DropColumn(
                name: "productid",
                table: "billDetails");

            migrationBuilder.DropColumn(
                name: "quantity",
                table: "billDetails");

            migrationBuilder.DropColumn(
                name: "totalValue",
                table: "billDetails");

            migrationBuilder.DropColumn(
                name: "unitValue",
                table: "billDetails");

            migrationBuilder.AddColumn<int>(
                name: "ClientEntityid",
                table: "products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_products_ClientEntityid",
                table: "products",
                column: "ClientEntityid");

            migrationBuilder.AddForeignKey(
                name: "FK_products_clients_ClientEntityid",
                table: "products",
                column: "ClientEntityid",
                principalTable: "clients",
                principalColumn: "id");
        }
    }
}
