using Microsoft.EntityFrameworkCore.Migrations;

namespace Elemental.FormBuilder.Migrations
{
    public partial class AddedForms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FormID",
                table: "FormFields",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Forms",
                columns: table => new
                {
                    FormID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forms", x => x.FormID);
                });

            migrationBuilder.InsertData(
                table: "Forms",
                columns: new[] { "FormID", "Description", "Title" },
                values: new object[] { 1, "A form for testing.", "Test Form" });

            migrationBuilder.CreateIndex(
                name: "IX_FormFields_FormID",
                table: "FormFields",
                column: "FormID");

            migrationBuilder.AddForeignKey(
                name: "FK_FormFields_Forms_FormID",
                table: "FormFields",
                column: "FormID",
                principalTable: "Forms",
                principalColumn: "FormID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormFields_Forms_FormID",
                table: "FormFields");

            migrationBuilder.DropTable(
                name: "Forms");

            migrationBuilder.DropIndex(
                name: "IX_FormFields_FormID",
                table: "FormFields");

            migrationBuilder.DropColumn(
                name: "FormID",
                table: "FormFields");
        }
    }
}
