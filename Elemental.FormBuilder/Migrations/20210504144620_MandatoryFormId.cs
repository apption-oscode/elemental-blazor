using Microsoft.EntityFrameworkCore.Migrations;

namespace Elemental.FormBuilder.Migrations
{
    public partial class MandatoryFormId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormFields_Forms_FormID",
                table: "FormFields");

            migrationBuilder.AlterColumn<int>(
                name: "FormID",
                table: "FormFields",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 1,
                column: "FormID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 2,
                column: "FormID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 3,
                column: "FormID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 4,
                column: "FormID",
                value: 1);

            migrationBuilder.AddForeignKey(
                name: "FK_FormFields_Forms_FormID",
                table: "FormFields",
                column: "FormID",
                principalTable: "Forms",
                principalColumn: "FormID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormFields_Forms_FormID",
                table: "FormFields");

            migrationBuilder.AlterColumn<int>(
                name: "FormID",
                table: "FormFields",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 1,
                column: "FormID",
                value: null);

            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 2,
                column: "FormID",
                value: null);

            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 3,
                column: "FormID",
                value: null);

            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "FormFieldID",
                keyValue: 4,
                column: "FormID",
                value: null);

            migrationBuilder.AddForeignKey(
                name: "FK_FormFields_Forms_FormID",
                table: "FormFields",
                column: "FormID",
                principalTable: "Forms",
                principalColumn: "FormID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
