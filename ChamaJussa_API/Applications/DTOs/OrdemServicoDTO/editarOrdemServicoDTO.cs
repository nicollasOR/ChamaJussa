namespace ChamaJussa_API.Applications.DTOs.OrdemServicoDTO;

public class editarOrdemServicoDTO
{        
    public string? NomeItem { get; set; }
    public int? LocalizacaoId { get; set; }
    public string? Descricao { get; set; }
    public IFormFile? Imagem { get; set; }
}