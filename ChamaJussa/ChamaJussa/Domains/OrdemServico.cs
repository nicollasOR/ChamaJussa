using System;
using System.Collections.Generic;

namespace ChamaJussa.Domains;

public partial class OrdemServico
{
    public int OS_ID { get; set; }

    public string NomeItem { get; set; } = null!;

    public DateTime dataCriacao { get; set; }

    public string Descricao { get; set; } = null!;

    public byte[]? Imagem { get; set; }

    public int StatusID { get; set; }

    public Guid usuarioSolicitante { get; set; }

    public int FilaID { get; set; }

    public virtual Fila Fila { get; set; } = null!;

    public virtual StatusItem Status { get; set; } = null!;

    public virtual Usuario usuarioSolicitanteNavigation { get; set; } = null!;
}
