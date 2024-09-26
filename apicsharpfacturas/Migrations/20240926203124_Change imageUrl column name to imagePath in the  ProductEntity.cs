using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apicsharpfacturas.Migrations
{
    /// <inheritdoc />
    public partial class ChangeimageUrlcolumnnametoimagePathintheProductEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "imageUrl",
                table: "products",
                newName: "imagePath");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "imagePath",
                table: "products",
                newName: "imageUrl");
        }
    }
}
