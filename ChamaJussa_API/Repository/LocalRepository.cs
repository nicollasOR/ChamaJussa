using ChamaJussa_API.Contexts;
using ChamaJussa_API.Domains;
using ChamaJussa_API.Interface;

namespace ChamaJussa_API.Repository;

public class LocalRepository : ILocalRepository
{
    private readonly JussaCalls2Context _context;
    public LocalRepository(JussaCalls2Context context) => _context = context;

    public List<Localizacao> Listar()
    {
        return _context.Localizacao.ToList();
    }
}