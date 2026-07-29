using ChamaJussa.Contexts;
using ChamaJussa.Domains;
using ChamaJussa.Interface;

namespace ChamaJussa.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly JussaCallsContext _context;

        public UsuarioRepository(JussaCallsContext context) => _context = context;

        public List<Usuario> ListarUsuarios()
        {
            return _context.Usuario.ToList();
        }

        public Usuario BuscarPorId(Guid id)
        {
            return _context.Usuario.Find(id);

        }

        public Usuario BuscarPorNIF(string NIF)
        {
            return _context.Usuario.Find(NIF);
        }

        public Usuario BuscarPorNome(string Nome)
        {
            return _context.Usuario.Find(Nome);
        }

        public void Adicionar(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            _context.SaveChanges();
        }

        public void Atualizar(Usuario usuario)
        {
            Usuario usuarioBanco = _context.Usuario.Find(usuario.UsuarioID);

            if (usuarioBanco == null)
                return;
        }
    }
}
