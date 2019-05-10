using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace core_server.Migrations
{
    public partial class Chatrooms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chatrooms",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chatrooms", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ChatroomMemberships",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UserID = table.Column<int>(nullable: true),
                    ChatroomID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatroomMemberships", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ChatroomMemberships_Chatrooms_ChatroomID",
                        column: x => x.ChatroomID,
                        principalTable: "Chatrooms",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatroomMemberships_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatroomMemberships_ChatroomID",
                table: "ChatroomMemberships",
                column: "ChatroomID");

            migrationBuilder.CreateIndex(
                name: "IX_ChatroomMemberships_UserID",
                table: "ChatroomMemberships",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatroomMemberships");

            migrationBuilder.DropTable(
                name: "Chatrooms");
        }
    }
}
