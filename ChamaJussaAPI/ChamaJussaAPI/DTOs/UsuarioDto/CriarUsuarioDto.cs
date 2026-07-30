namespace ChamaJussaAPI.DTOs.UsuarioDto
{
    public class CriarUsuarioDto
    {
        public string Nome { get; set; } = null!;
        public int NIF { get; set; }
        public string Email { get; set; } = null!;
        public string Senha { get; set; } = null!;
    }
}
