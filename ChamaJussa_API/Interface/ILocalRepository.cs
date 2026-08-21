using ChamaJussa_API.Domains;

namespace ChamaJussa_API.Interface;

public interface ILocalRepository
{
    public List<Localizacao> Listar();
}