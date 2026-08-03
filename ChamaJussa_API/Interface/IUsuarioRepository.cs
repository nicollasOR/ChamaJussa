using ChamaJussa_API.Domains;

namespace ChamaJussa_API.Interface;

public interface IUsuarioRepository
{
    public List<Usuario> Listar();

    public Usuario BuscarPorNIF(string NIF);

    public Usuario BuscarPorId(Guid id);

    public Usuario BuscarPorEmail(string email);

    public bool NifExiste(string nif);
    public bool EmailExiste(string email);

    public void Adicionar(Usuario usuario);
    public void atualizarSenha(Guid id, byte[] senha);
}