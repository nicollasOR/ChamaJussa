namespace ChamaJussa_API.Applications.DTOs.OrdemServicoDTO;

public class criarOrdemServicoDTO
{
    public string NomeItem { get; set; } = null!;
    public int? LocalizacaoId { get; set; }
    public string Descricao { get; set; } = null!;
    public IFormFile? Imagem { get; set; }
}