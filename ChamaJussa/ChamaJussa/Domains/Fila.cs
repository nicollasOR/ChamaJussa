using System;
using System.Collections.Generic;

namespace ChamaJussa.Domains;

public partial class Fila
{
    public int FilaID { get; set; }

    public string? NomeFila { get; set; }

    public virtual ICollection<OrdemServico> OrdemServico { get; set; } = new List<OrdemServico>();
}
