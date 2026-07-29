namespace ChamaJussa.Applications.DTOs
{
    public class UsuarioListar
    {
        public Guid usuarioID { get; set; } = Guid.Empty;
        public string Nome { get; set; } = string.Empty;

        public string NIF { get; set;  } = string.Empty;
         
        public string Email { get; set; } = string.Empty;



    }
}
