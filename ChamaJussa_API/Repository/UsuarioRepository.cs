using ChamaJussa_API.Contexts;
using ChamaJussa_API.Domains;
using ChamaJussa_API.Interface;

namespace ChamaJussa_API.Repository;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly JussaCalls2Context _context;
    
    public UsuarioRepository(JussaCalls2Context context) => _context = context;

    public List<Usuario> Listar()
    {
        return _context.Usuario.ToList();
    }

    public Usuario BuscarPorNIF(string nif)
    {
        return _context.Usuario.FirstOrDefault(varAux => varAux.NIF == nif);
    }

    public Usuario BuscarPorId(Guid id)
    {
        return _context.Usuario.Find(id);
    }

    public bool NifExiste(string nif)
    {
        return _context.Usuario.Any(nifAux => nifAux.NIF == nif);
    }

    public bool EmailExiste(string email)
    {
        return _context.Usuario.Any(emailAux => emailAux.Email == email);
    }

    public void Adicionar(Usuario usuario)
    {
        _context.Usuario.Add(usuario);
        _context.SaveChanges();
    }

    public Usuario BuscarPorEmail(string email)
    {
        return _context.Usuario.FirstOrDefault(varAux => varAux.Email == email);
    }

    public void atualizarSenha(Guid id, byte[] senha)
    {
        var usuarioBanco = _context.Usuario.Find(id);

        if (usuarioBanco == null)
            return;
        
        usuarioBanco.Senha = senha;
        _context.Usuario.Update(usuarioBanco);
        _context.SaveChanges();
    }
    // public void Atualizar(Guid id, Usuario usuario)
    // {
    //     var usuarioBanco = _context.Usuario.Find(id);
    //     
    //     if(usuarioBanco == null)
    //         return;
    //     
    //     usuarioBanco.Nome = usuario.Nome;
    //     usuarioBanco.Email = usuario.Email;
    //     usuarioBanco.Senha = usuario.Senha;
    //     usuarioBanco.NIF = usuario.NIF;
    //
    //     _context.SaveChanges();
    //     
    // }
    //
    // public void Remover(Guid id)
    // {
    //     var usuarioBanco = _context.Usuario.Find(id);
    //
    //     if (usuarioBanco == null)
    //         return;
    //
    //     _context.Usuario.Remove(usuarioBanco);
    //     _context.SaveChanges();
    // }
}