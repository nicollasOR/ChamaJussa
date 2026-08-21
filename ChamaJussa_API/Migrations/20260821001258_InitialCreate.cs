using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChamaJussa_API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fila",
                columns: table => new
                {
                    FilaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomeFila = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Fila__6E0F8A59AF24E1DA", x => x.FilaID);
                });

            migrationBuilder.CreateTable(
                name: "Localizacao",
                columns: table => new
                {
                    LocalizacaoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Andar = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Localiza__83ABDECACA4D1030", x => x.LocalizacaoID);
                });

            migrationBuilder.CreateTable(
                name: "Status_OS",
                columns: table => new
                {
                    StatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomeStatus = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Status_O__C8EE2043AEE983F5", x => x.StatusID);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    UsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    Nome = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "varchar(60)", unicode: false, maxLength: 60, nullable: false),
                    Senha = table.Column<byte[]>(type: "varbinary(32)", maxLength: 32, nullable: false),
                    NIF = table.Column<string>(type: "varchar(11)", unicode: false, maxLength: 11, nullable: false),
                    StatusUsuario = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Usuario__2B3DE7989F3998A8", x => x.UsuarioID);
                });

            migrationBuilder.CreateTable(
                name: "OrdemServico",
                columns: table => new
                {
                    OS_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomeItem = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    dataCriacao = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Imagem = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    StatusID = table.Column<int>(type: "int", nullable: false),
                    usuarioSolicitante = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FilaID = table.Column<int>(type: "int", nullable: true),
                    LocalizacaoID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrdemSer__85A506ED81A76118", x => x.OS_ID);
                    table.ForeignKey(
                        name: "OS_FilaID_FK",
                        column: x => x.FilaID,
                        principalTable: "Fila",
                        principalColumn: "FilaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "OS_Localizacao_FK",
                        column: x => x.LocalizacaoID,
                        principalTable: "Localizacao",
                        principalColumn: "LocalizacaoID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "OS_Status_FK",
                        column: x => x.StatusID,
                        principalTable: "Status_OS",
                        principalColumn: "StatusID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "OS_usuarioSolicitante_FK",
                        column: x => x.usuarioSolicitante,
                        principalTable: "Usuario",
                        principalColumn: "UsuarioID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServico_FilaID",
                table: "OrdemServico",
                column: "FilaID");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServico_LocalizacaoID",
                table: "OrdemServico",
                column: "LocalizacaoID");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServico_StatusID",
                table: "OrdemServico",
                column: "StatusID");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServico_usuarioSolicitante",
                table: "OrdemServico",
                column: "usuarioSolicitante");

            migrationBuilder.CreateIndex(
                name: "UQ__Usuario__A9D10534FF5BE9A0",
                table: "Usuario",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Usuario__C7DEC330F05C5805",
                table: "Usuario",
                column: "NIF",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrdemServico");

            migrationBuilder.DropTable(
                name: "Fila");

            migrationBuilder.DropTable(
                name: "Localizacao");

            migrationBuilder.DropTable(
                name: "Status_OS");

            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
