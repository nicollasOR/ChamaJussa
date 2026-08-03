using System;
using System.Collections.Generic;

namespace ChamaJussa_API.Domains;

public partial class Status_OS
{
    public int StatusID { get; set; }

    public string NomeStatus { get; set; } = null!;

    public virtual ICollection<OrdemServico> OrdemServico { get; set; } = new List<OrdemServico>();
}
