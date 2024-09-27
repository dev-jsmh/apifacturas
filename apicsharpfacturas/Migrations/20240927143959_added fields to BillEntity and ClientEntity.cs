using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apicsharpfacturas.Migrations
{
    /// <inheritdoc />
    public partial class addedfieldstoBillEntityandClientEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "clients",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "phone",
                table: "clients",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "totalItems",
                table: "bills",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "address",
                table: "clients");

            migrationBuilder.DropColumn(
                name: "phone",
                table: "clients");

            migrationBuilder.DropColumn(
                name: "totalItems",
                table: "bills");
        }
    }
}
