using System;
using System.Collections.Generic;

namespace ChamaJussaAPI.Domains;

public partial class status
{
    public int status_id { get; set; }

    public string nome { get; set; } = null!;

    public virtual ICollection<OrdemDeServico> OrdemDeServico { get; set; } = new List<OrdemDeServico>();
}
