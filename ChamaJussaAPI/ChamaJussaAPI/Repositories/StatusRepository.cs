using ChamaJussaAPI.Contexts;
using ChamaJussaAPI.Interfaces;
using ChamaJussaAPI.Domains;
namespace ChamaJussaAPI.Repositories
{
    public class StatusRepository : IStatusRepository
    {
        private readonly ChamaJussaContext _context;

        public StatusRepository(ChamaJussaContext context) => _context = context;

        public List<status> Listar()
        {
            return _context.status.ToList();
        }

        public status BuscarPorNome(string nome)
        {
            return _context.status.FirstOrDefault(varAux => varAux.nome == nome);
        }

        public bool nomeExiste(string nome)
        {
            return _context.status.Any(varAux => varAux.nome == nome);
        }
    }
}
