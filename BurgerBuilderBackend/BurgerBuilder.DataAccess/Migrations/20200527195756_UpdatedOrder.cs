using Microsoft.EntityFrameworkCore.Migrations;

namespace BurgerBuilder.DataAccess.Migrations
{
    public partial class UpdatedOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customers_CustomerID",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Ingridients_IngridientsID",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "IngridientsID",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CustomerID",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Customers_CustomerID",
                table: "Orders",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Ingridients_IngridientsID",
                table: "Orders",
                column: "IngridientsID",
                principalTable: "Ingridients",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customers_CustomerID",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Ingridients_IngridientsID",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "IngridientsID",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "CustomerID",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Customers_CustomerID",
                table: "Orders",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Ingridients_IngridientsID",
                table: "Orders",
                column: "IngridientsID",
                principalTable: "Ingridients",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
