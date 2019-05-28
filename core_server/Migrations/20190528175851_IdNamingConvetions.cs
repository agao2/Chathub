using Microsoft.EntityFrameworkCore.Migrations;

namespace core_server.Migrations
{
    public partial class IdNamingConvetions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatroomMemberships_Chatrooms_ChatroomID",
                table: "ChatroomMemberships");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatroomMemberships_Users_UserID",
                table: "ChatroomMemberships");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Users",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Chatrooms",
                newName: "ChatroomId");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "ChatroomMemberships",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ChatroomID",
                table: "ChatroomMemberships",
                newName: "ChatroomId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "ChatroomMemberships",
                newName: "ChatroomMembershipId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatroomMemberships_UserID",
                table: "ChatroomMemberships",
                newName: "IX_ChatroomMemberships_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatroomMemberships_ChatroomID",
                table: "ChatroomMemberships",
                newName: "IX_ChatroomMemberships_ChatroomId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatroomMemberships_Chatrooms_ChatroomId",
                table: "ChatroomMemberships",
                column: "ChatroomId",
                principalTable: "Chatrooms",
                principalColumn: "ChatroomId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatroomMemberships_Users_UserId",
                table: "ChatroomMemberships",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatroomMemberships_Chatrooms_ChatroomId",
                table: "ChatroomMemberships");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatroomMemberships_Users_UserId",
                table: "ChatroomMemberships");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Users",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "ChatroomId",
                table: "Chatrooms",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ChatroomMemberships",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "ChatroomId",
                table: "ChatroomMemberships",
                newName: "ChatroomID");

            migrationBuilder.RenameColumn(
                name: "ChatroomMembershipId",
                table: "ChatroomMemberships",
                newName: "ID");

            migrationBuilder.RenameIndex(
                name: "IX_ChatroomMemberships_UserId",
                table: "ChatroomMemberships",
                newName: "IX_ChatroomMemberships_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_ChatroomMemberships_ChatroomId",
                table: "ChatroomMemberships",
                newName: "IX_ChatroomMemberships_ChatroomID");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatroomMemberships_Chatrooms_ChatroomID",
                table: "ChatroomMemberships",
                column: "ChatroomID",
                principalTable: "Chatrooms",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatroomMemberships_Users_UserID",
                table: "ChatroomMemberships",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
