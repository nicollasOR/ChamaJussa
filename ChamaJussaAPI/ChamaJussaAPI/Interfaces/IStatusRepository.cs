using ChamaJussaAPI.Domains;

namespace ChamaJussaAPI.Interfaces
{
    public interface IStatusRepository
    {
        public List<status> Listar();

        public status BuscarPorStatus(string nome);
        public bool nomeExiste(string nome);
    }
}
