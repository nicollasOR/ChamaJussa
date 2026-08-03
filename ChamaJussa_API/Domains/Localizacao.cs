using System;
using System.Collections.Generic;

namespace ChamaJussa_API.Domains;

public partial class Localizacao
{
    public int LocalizacaoID { get; set; }

    public string Nome { get; set; } = null!;

    public string Andar { get; set; } = null!;

    public virtual ICollection<OrdemServico> OrdemServico { get; set; } = new List<OrdemServico>();
}
