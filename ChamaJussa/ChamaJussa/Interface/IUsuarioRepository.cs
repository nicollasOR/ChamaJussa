using ChamaJussa.Domains;

namespace ChamaJussa.Interface
{
    public interface IUsuarioRepository
    {

        public List<Usuario> ListarUsuarios();

        public Usuario BuscarPorId(Guid id);

        public Usuario BuscarPorNIF(string Nif);

        public Usuario BuscarPorNome(string nome);

        public void Adicionar(Usuario usuario);

        public void Atualizar(Usuario usuario);



    }
}
