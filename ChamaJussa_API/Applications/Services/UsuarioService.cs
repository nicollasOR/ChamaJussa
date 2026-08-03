using ChamaJussa_API.Applications.DTOs;
using ChamaJussa_API.Domains;
using ChamaJussa_API.Exceptions;
using ChamaJussa_API.Interface;
using ChamaJussa_API.Applications.Formatações;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace ChamaJussa_API.Applications.Services;

public class UsuarioService
{
    private readonly IUsuarioRepository _repository;
    private readonly Formatacoes _formatacoes;

    public UsuarioService(IUsuarioRepository repository) => _repository = repository;

    private static void validarEmail(string email)
    {
        if (string.IsNullOrEmpty(email) || !email.Contains('@'))
            throw new DomainException("Email invalido");
        
    }

    private static void validarNIF(string nif)
    {
        if (string.IsNullOrEmpty(nif))
            throw new DomainException("NIF invalido");
    }

    static byte[] HashSenha(string senha)
    {
        if (string.IsNullOrWhiteSpace(senha))
        {
            throw new DomainException("Senha é obrigatória.");
        }

        

        using var sha256 = SHA256.Create();
        return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
    }
    private static listarUsuarioDTO lerDTO(Usuario usuario)
    {

        return new listarUsuarioDTO
        {
            usuarioID = usuario.UsuarioID,
            email = usuario.Email,
            nif = usuario.NIF,
            nome = usuario.Nome,
            StatusUsuario = usuario.StatusUsuario ?? true
        };
    }


    public List<listarUsuarioDTO> Listar()
    {
        List<Usuario> usuariosListados =
        _repository.Listar();

        List<listarUsuarioDTO> retornarLista = usuariosListados.Select
            (usuariosAux => lerDTO(usuariosAux)).ToList();

        return retornarLista;
    }

    public listarUsuarioDTO BuscarPorID(Guid usuarioId)
    {
        Usuario? usuariosListado = _repository.BuscarPorId(usuarioId);

        if (usuariosListado == null)
            throw new DomainException("Usuario não encontrado");

        return lerDTO(usuariosListado);
    }
    
    public listarUsuarioDTO BuscarPorNif(string nif)
    {

        
        Usuario? usuariosListado = _repository.BuscarPorNIF(nif);

        if (usuariosListado == null)
            throw new DomainException("Usuario não encontrado");

        return lerDTO(usuariosListado);
    }

    public listarUsuarioDTO Adicionar(criarUsuarioDTO usuarioDTOs)
    {
        validarEmail(usuarioDTOs.email);
        validarNIF(usuarioDTOs.nif);

        if (_repository.EmailExiste(usuarioDTOs.email) || _repository.NifExiste(usuarioDTOs.nif))
            throw new DomainException("Email e/ou nif ja existente");

        Usuario usuarioPOST = new Usuario
        {
            // UsuarioID = usuarioDTOs.usuarioID,
            Email = usuarioDTOs.email,
            NIF = usuarioDTOs.nif,
            Senha = HashSenha(usuarioDTOs.senha),
            // Senha = HashSenha(criarUsuarioDto.senha),
            StatusUsuario = true,
            Nome = usuarioDTOs.nome
        };
        
        _repository.Adicionar(usuarioPOST);
        // return listarUsuarioDTO(usuarioPOST);

        return lerDTO(usuarioPOST);


    }

    public void atualizarSenha(Guid id, atualizarSenhaDTO senhaDTO)
    {
        Usuario usuarioBanco = _repository.BuscarPorId(id);
        if (usuarioBanco == null)
            throw new DomainException("Usuario nao encontrado");
        usuarioBanco.Senha = HashSenha(senhaDTO.senha);
        _repository.atualizarSenha(id, usuarioBanco.Senha);

        // var senhaAtual = HashSenha(senhaDTO);
        // _repository.atualizarSenha(id, senhaAtual);
    }
    
    
    
}