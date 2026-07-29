using System;
using System.Collections.Generic;

namespace ChamaJussa.Domains;

public partial class Usuario
{
    public Guid UsuarioID { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public byte[]? Senha { get; set; }

    public string? NIF { get; set; }

    public virtual ICollection<OrdemServico> OrdemServico { get; set; } = new List<OrdemServico>();
}
