using ChamaJussa_API.Applications.Auth;
using ChamaJussa_API.Interface;
using System.Text;
using System.Security.Cryptography;
using ChamaJussa_API.Applications.DTOs.AuthDTO;
using ChamaJussa_API.Domains;
using ChamaJussa_API.Exceptions;

namespace ChamaJussa_API.Applications.Services;

public class AuthService
{
    private readonly IUsuarioRepository _repository;
    private readonly GerarJWT _tokenJwt;

    public AuthService(IUsuarioRepository repository, GerarJWT tokenJwt)
    {
        _repository = repository;
        _tokenJwt = tokenJwt;
    }

    private static byte[] HashSenha(string senha)
    {
        using var sha256 = SHA256.Create();
        return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
    }

    private static bool VerificarSenha(string senhaDigitada, byte[] senhaHashBanco)
    {
        return HashSenha(senhaDigitada).SequenceEqual(senhaHashBanco);
    }

    public tokenJWT Login(loginDTO loginDTOs)
    {
        Usuario? usuario = _repository.BuscarPorEmail(loginDTOs.Email);

        if (usuario == null)
        {
            throw new DomainException("E-mail ou senha inválidos");
        }

        if (!VerificarSenha(loginDTOs.Senha, usuario.Senha))
        {
            throw new DomainException("E-mail ou senha inválidos");
        }

        var token = _tokenJwt.GerarToken(usuario);

        return new tokenJWT() { token = token };
    }
}