namespace ChamaJussa.Applications.DTOs
{
    public class CriarUsuarioDTO
    {
        public Guid usuarioID { get; set; } = Guid.Empty;

        public string Nome { get; set; } = string.Empty;

        public byte Senha { get; set; } 
        public string NIF { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
    }
}
