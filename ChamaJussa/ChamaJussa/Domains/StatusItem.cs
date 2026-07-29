using System;
using System.Collections.Generic;

namespace ChamaJussa.Domains;

public partial class StatusItem
{
    public int StatusID { get; set; }

    public string? NomeStatus { get; set; }

    public virtual ICollection<OrdemServico> OrdemServico { get; set; } = new List<OrdemServico>();
}
