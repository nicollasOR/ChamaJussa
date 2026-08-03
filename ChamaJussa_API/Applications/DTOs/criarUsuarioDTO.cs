namespace ChamaJussa_API.Applications.DTOs;

public class criarUsuarioDTO
{
    // public Guid usuarioID { get; set; } = Guid.Empty;
    public string nome { get; set; } = string.Empty;

    public string nif { get; set; } = string.Empty;

    public string email { get; set; } = string.Empty;
    public string senha { get; set; } = string.Empty;
}