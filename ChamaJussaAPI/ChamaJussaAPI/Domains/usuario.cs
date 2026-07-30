using System;
using System.Collections.Generic;

namespace ChamaJussaAPI.Domains;

public partial class usuario
{
    public Guid usuario_id { get; set; }

    public string nome { get; set; } = null!;

    public string email { get; set; } = null!;

    public byte[] senha { get; set; } = null!;

    public int nif { get; set; }

    public virtual ICollection<OrdemDeServico> OrdemDeServico { get; set; } = new List<OrdemDeServico>();
}
