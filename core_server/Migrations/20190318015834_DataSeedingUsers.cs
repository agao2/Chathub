using Microsoft.EntityFrameworkCore.Migrations;

namespace core_server.Migrations
{
    public partial class DataSeedingUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "DateCreated", "EmailAddress", "Password", "PasswordSalt", "Username" },
                values: new object[] { 1, "3/17/2019", "alex@fake.com", "password", "password_salt", "alex" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1);
        }
    }
}
