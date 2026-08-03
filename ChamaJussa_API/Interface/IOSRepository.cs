using ChamaJussa_API.Domains;


namespace ChamaJussa_API.Interface;

public interface IOSRepository
{
    public void Atualizar(OrdemServico os);
    public List<OrdemServico> Listar();
    public void Adicionar(OrdemServico os);
    public void Deletar(OrdemServico os);
    public List<OrdemServico> ListarPorUsuario(Guid usuarioId);
    public OrdemServico? ObterPorId(int id);
    public bool LocalizacaoExiste(int localizacaoId);
    public bool StatusExiste(int statusId);
    public int ObterStatusInicialId();
    public int? ObterFilaInicialId();
}