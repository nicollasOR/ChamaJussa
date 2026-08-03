using System;
using System.Collections.Generic;

namespace ChamaJussa_API.Domains;

public partial class OrdemServico
{
    public int OS_ID { get; set; }

    public string NomeItem { get; set; } = null!;

    public DateTime dataCriacao { get; set; }

    public string Descricao { get; set; } = null!;

    public string? Imagem { get; set; }

    public int StatusID { get; set; }

    public Guid? usuarioSolicitante { get; set; }

    public int? FilaID { get; set; }

    public int? LocalizacaoID { get; set; }

    public virtual Fila? Fila { get; set; }

    public virtual Localizacao? Localizacao { get; set; }

    public virtual Status_OS Status { get; set; } = null!;

    public virtual Usuario? usuarioSolicitanteNavigation { get; set; }
}
