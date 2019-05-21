using Microsoft.EntityFrameworkCore.Migrations;

namespace core_server.Migrations
{
    public partial class DataSeedingChatrooms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Chatrooms",
                columns: new[] { "ID", "Name" },
                values: new object[] { 1, "General" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Chatrooms",
                keyColumn: "ID",
                keyValue: 1);

        }
    }
}
