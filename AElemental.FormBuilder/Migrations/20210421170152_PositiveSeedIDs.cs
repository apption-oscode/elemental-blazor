using Microsoft.EntityFrameworkCore.Migrations;

namespace AElemental.FormBuilder.Migrations
{
    public partial class PositiveSeedIDs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "FormFields",
                columns: new[] { "FormFieldID", "DropdownOptionCount", "Extension", "Field", "FieldType", "Mandatory", "MaxLength", "Section" },
                values: new object[] { 1, null, "NAME", "Name", "Text", true, 100, "Basic info" });

            migrationBuilder.InsertData(
                table: "FormFields",
                columns: new[] { "FormFieldID", "DropdownOptionCount", "Extension", "Field", "FieldType", "Mandatory", "MaxLength", "Section" },
                values: new object[] { 2, null, "DESC", "Description", "Text", false, 400, "Basic info" });

            migrationBuilder.InsertData(
                table: "FormFields",
                columns: new[] { "FormFieldID", "DropdownOptionCount", "Extension", "Field", "FieldType", "Mandatory", "MaxLength", "Section" },
                values: new object[] { 3, null, "DT", "Creation Date", "Date", true, null, "Basic info" });

            migrationBuilder.InsertData(
                table: "FormFields",
                columns: new[] { "FormFieldID", "DropdownOptionCount", "Extension", "Field", "FieldType", "Mandatory", "MaxLength", "Section" },
                values: new object[] { 4, null, "AMT", "Price", "Money", true, null, "Price" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 4);

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
    }
}
