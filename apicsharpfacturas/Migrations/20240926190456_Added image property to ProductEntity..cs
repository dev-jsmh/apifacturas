using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apicsharpfacturas.Migrations
{
    /// <inheritdoc />
    public partial class AddedimagepropertytoProductEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imageUrl",
                table: "products",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageUrl",
                table: "products");
        }
    }
}
