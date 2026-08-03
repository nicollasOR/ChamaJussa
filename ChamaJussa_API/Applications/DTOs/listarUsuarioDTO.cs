namespace ChamaJussa_API.Applications.DTOs;

public class listarUsuarioDTO
{
    public Guid usuarioID { get; set; } = Guid.Empty;
    public string nome { get; set; } = string.Empty;

    public string nif { get; set; } = string.Empty;

    public string email { get; set; } = string.Empty;
    public bool StatusUsuario { get; set; } 
}