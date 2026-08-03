CREATE DATABASE JussaCalls2
GO
USE JussaCalls2
GO
CREATE TABLE Usuario
(
    UsuarioID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Nome VARCHAR(50) NOT NULL,
    Email VARCHAR(60) NOT NULL UNIQUE,
    Senha VARBINARY(32) NOT NULL,
    NIF VARCHAR(11) UNIQUE NOT NULL,
    StatusUsuario BIT DEFAULT 1
)



CREATE TABLE Status_OS
(
    StatusID INT PRIMARY KEY IDENTITY(1,1),
    NomeStatus NVARCHAR(30) NOT NULL
)
GO
CREATE TABLE Fila
(
    FilaID INT PRIMARY KEY IDENTITY(1,1),
    NomeFila VARCHAR(50)
)

GO

CREATE TABLE Localizacao
(
    LocalizacaoID INT PRIMARY KEY IDENTITY (1,1),
    Nome VARCHAR(50) NOT NULL, --nvarchar
    Andar VARCHAR(15) NOT NULL -- nvarchar
)

GO


CREATE TABLE OrdemServico
(
    OS_ID INT PRIMARY KEY IDENTITY(1,1),
    NomeItem VARCHAR(50) NOT NULL,
    dataCriacao DATETIME2(0) NOT NULL,
    Descricao NVARCHAR(255) NOT NULL,
    Imagem VARCHAR(MAX) NULL,
    StatusID INT NOT NULL,
    usuarioSolicitante UNIQUEIDENTIFIER NULL,
    FilaID INT NULL,
    LocalizacaoID INT NULL,

    CONSTRAINT OS_FilaID_FK FOREIGN KEY(FilaID)
        REFERENCES Fila(FilaID) ON DELETE CASCADE,

    CONSTRAINT OS_usuarioSolicitante_FK FOREIGN KEY(usuarioSolicitante)
        REFERENCES Usuario(UsuarioID) ON DELETE CASCADE,

    CONSTRAINT OS_Status_FK FOREIGN KEY(StatusID)
        REFERENCES Status_OS(StatusID) ON DELETE CASCADE,

    CONSTRAINT OS_Localizacao_FK FOREIGN KEY(LocalizacaoID)
        REFERENCES Localizacao(LocalizacaoID) ON DELETE CASCADE

)

GO

CREATE TRIGGER trg_Usuario_SoftDelete
    On Usuario
    INSTEAD OF Delete
    AS
BEGIN
    UPDATE usr
    SET StatusUsuario = 0
    FROM Usuario usr
             INNER JOIN deleted d
                        ON d.UsuarioID = usr.UsuarioID

END


INSERT INTO Fila(NomeFila)
VALUES
    ('Suporte'), ('Manutenção')
GO
INSERT INTO Localizacao(Nome, Andar)
VALUES
    ('Sala do Diretor', 'Térreo'), ('Sala da Coordenação da Faculdade', 'Térreo'), ('Sala de Reunião', 'Térreo'),
    ('Secretaria', 'Térreo'), ('Biblioteca', 'Térreo'), ('Copa dos Funcionários', 'Térreo'),
    ('Atendimento', 'Térreo'),
    ('Sala 1', '1º Andar'), ('Sala 2', '1º Andar'), ('Sala 3', '1º Andar'), ('Sala 04/05', '1º Andar'),
    ('Sala 06/07', '1º Andar'), ('Studio', '1º Andar'), ('Mesacast', '1º Andar');
GO

INSERT INTO Status_OS(NomeStatus)
VALUES
    ('Aberto'), ('Em andamento'),
    ('Concluído'), ('Cancelado')