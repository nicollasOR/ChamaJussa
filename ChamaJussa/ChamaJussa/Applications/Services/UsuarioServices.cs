using ChamaJussa.Applications.DTOs;
using ChamaJussa.Domains;
using ChamaJussa.Exceptions;
using ChamaJussa.Interface;

namespace ChamaJussa.Applications.Services
{
    public class UsuarioServices
    {

        private readonly IUsuarioRepository _repository;

        public UsuarioServices(IUsuarioRepository repository) => _repository = repository

            private static UsuarioListar LerDTO(Usuario usuario)
        {
            UsuarioListar lerUsuario = new UsuarioListar
            {
                usuarioID = usuario.UsuarioID,
                Email = usuario.Email,
                NIF = usuario.NIF

            };

            return lerUsuario;
        }
        public List<UsuarioListar> Listar()
        {
            List<Usuario> listarUsuario = _repository.ListarUsuarios();

            List<UsuarioListar> usuarioDTO = listarUsuario.Select(usuarioAux => LerDTO(usuarioAux)).ToList();

            return usuarioDTO;
        }

        public UsuarioListar BuscarPorNIF(string NIF)
        {
            Usuario? usuario = _repository.BuscarPorNIF(NIF);

            if (usuario == null)
                throw new DomainException("Usuario não encontrado");

            return LerDTO(usuario);
        }

        public UsuarioListar BuscarPorID(Guid id)
        {
            Usuario? usuario = _repository.BuscarPorId(id);

            if (usuario == null)
                throw new DomainException("Usuario não encontrado");

            return LerDTO(usuario);
        }

        public UsuarioListar BuscarPorNome(string nome)
        {
            Usuario? usuario = _repository.BuscarPorNome(nome);

            if(usuario == null)
                throw new DomainException("Usuario não encontrado");

            return LerDTO(usuario);
        }

        public CriarUsuarioDTO Adicionar(Usuario usuario)
        {
            if (usuario == null)
                return;


        }


    }
}
