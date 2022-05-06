using Microsoft.EntityFrameworkCore.Migrations;

namespace AElemental.FormBuilder.Migrations
{
    public partial class StringDropdowns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Section",
                table: "FormFields",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FieldType",
                table: "FormFields",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "Field",
                table: "FormFields",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Extension",
                table: "FormFields",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.InsertData(
                table: "FormFields",
                columns: new[] { "FormFieldID", "DropdownOptionCount", "Extension", "Field", "FieldType", "Mandatory", "MaxLength", "Section" },
                values: new object[] { -1, null, "NAME", "Name", "Text", true, 100, "Basic info" });

            migrationBuilder.InsertData(
                table: "FormFields",
                columns: new[] { "FormFieldID", "DropdownOptionCount", "Extension", "Field", "FieldType", "Mandatory", "MaxLength", "Section" },
                values: new object[] { -2, null, "DESC", "Description", "Text", false, 400, "Basic info" });

            migrationBuilder.InsertData(
                table: "FormFields",
                columns: new[] { "FormFieldID", "DropdownOptionCount", "Extension", "Field", "FieldType", "Mandatory", "MaxLength", "Section" },
                values: new object[] { -3, null, "DT", "Creation Date", "Date", true, null, "Basic info" });

            migrationBuilder.InsertData(
                table: "FormFields",
                columns: new[] { "FormFieldID", "DropdownOptionCount", "Extension", "Field", "FieldType", "Mandatory", "MaxLength", "Section" },
                values: new object[] { -4, null, "AMT", "Price", "Money", true, null, "Price" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: -4);

            migrationBuilder.DeleteData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: -3);

            migrationBuilder.DeleteData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: -1);

            migrationBuilder.AlterColumn<string>(
                name: "Section",
                table: "FormFields",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "FieldType",
                table: "FormFields",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Field",
                table: "FormFields",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "Extension",
                table: "FormFields",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
