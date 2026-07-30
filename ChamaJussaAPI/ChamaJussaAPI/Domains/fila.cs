using System;
using System.Collections.Generic;

namespace ChamaJussaAPI.Domains;

public partial class fila
{
    public int fila_id { get; set; }

    public string nome { get; set; } = null!;

    public virtual ICollection<OrdemDeServico> OrdemDeServico { get; set; } = new List<OrdemDeServico>();
}
