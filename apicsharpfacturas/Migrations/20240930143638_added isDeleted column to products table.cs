using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apicsharpfacturas.Migrations
{
    /// <inheritdoc />
    public partial class addedisDeletedcolumntoproductstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "products",
                type: "tinyint(1)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "products");
        }
    }
}
