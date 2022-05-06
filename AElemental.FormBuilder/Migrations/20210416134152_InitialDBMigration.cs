using Microsoft.EntityFrameworkCore.Migrations;

namespace AElemental.FormBuilder.Migrations
{
    public partial class InitialDBMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FormFields",
                columns: table => new
                {
                    FormFieldID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Section = table.Column<string>(type: "TEXT", nullable: true),
                    Field = table.Column<string>(type: "TEXT", nullable: true),
                    Extension = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxLength = table.Column<int>(type: "INTEGER", nullable: true),
                    Mandatory = table.Column<bool>(type: "INTEGER", nullable: false),
                    FieldType = table.Column<int>(type: "INTEGER", nullable: false),
                    DropdownOptionCount = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormFields", x => x.FormFieldID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormFields");
        }
    }
}
