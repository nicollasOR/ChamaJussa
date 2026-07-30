using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using ChamaJussaAPI.Domains;
using ChamaJussaAPI.DTOs.UsuarioDto;
using ChamaJussaAPI.Exceptions;
using ChamaJussaAPI.Interfaces;

namespace ChamaJussaAPI.Applications.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        private static LerUsuarioDto LerDto(usuario usuario)
        {
            return new LerUsuarioDto
            {
                Id = usuario.usuario_id,
                Nome = usuario.nome,
                NIF = usuario.nif,
                Email = usuario.email
            };
        }

        public List<LerUsuarioDto> Listar()
        {
            List<usuario> usuarios = _repository.Listar();
            return usuarios.Select(u => LerDto(u)).ToList();
        }

        public LerUsuarioDto ObterPorId(Guid id)
        {
            usuario? usuario = _repository.ObterPorId(id);
            if (usuario == null)
            {
                throw new DomainException("Usuário não existe.");
            }
            return LerDto(usuario);
        }

        private static void ValidarEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email) || !email.Contains("@"))
            {
                throw new DomainException("Email inválido.");
            }
        }

        private static byte[] HashSenha(string senha)
        {
            if (string.IsNullOrWhiteSpace(senha))
            {
                throw new DomainException("Senha é obrigatória.");
            }

            using var sha256 = SHA256.Create();
            return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
        }

        public LerUsuarioDto ObterPorEmail(string email)
        {
            usuario? usuario = _repository.ObterPorEmail(email);

            if (usuario == null)
                throw new DomainException("Usuario nao encontrado");

            return LerDto(usuario);
        }

        public LerUsuarioDto Adicionar(CriarUsuarioDto usuarioDto)
        {
            ValidarEmail(usuarioDto.Email);

            if (_repository.EmailExiste(usuarioDto.Email))
            {
                throw new DomainException("Já existe um usuário com este e-mail.");
            }

            usuario usuario = new usuario
            {
                usuario_id = Guid.NewGuid(),
                nome = usuarioDto.Nome,
                nif = usuarioDto.NIF,
                email = usuarioDto.Email,
                //senha =  usuarioDto.Senha
                senha = HashSenha(usuarioDto.Senha)
            };

            _repository.Adicionar(usuario);

            return LerDto(usuario);
        }

        public LerUsuarioDto Atualizar(Guid id, CriarUsuarioDto usuarioDTO)
        {
            usuario usuarioBanco = _repository.ObterPorId(id);

            if (usuarioBanco == null)
                throw new DomainException("Usuario nao encontrado");

            ValidarEmail(usuarioBanco.email);
            usuario usuarioEmail = _repository.ObterPorEmail(usuarioDTO.Email);

            if (usuarioBanco.email == usuarioDTO.Email)
                throw new DomainException("Usuario com mesmo email encontrado!");

            usuarioBanco.nif = usuarioDTO.NIF;
            usuarioBanco.email = usuarioDTO.Email;
            usuarioBanco.nome = usuarioDTO.Nome;


            _repository.Atualizar(usuarioBanco);

            return LerDto(usuarioBanco);

        }

        public LerUsuarioDto BuscarPorNif(int nif)
        {
            usuario usuarioBanco = _repository.ObterPorNif(nif);

            if (usuarioBanco == null)
                throw new DomainException("Usuario nao encontrado");

            return LerDto(usuarioBanco);
        }

        //public CriarUsuarioDto AtualizarSenha(Guid id, CriarUsuarioDto usuarioDTO)
        //{
        //    usuario usuarioBanco = _repository.ObterPorId(id);

        //    if (usuarioBanco == null)
        //        throw new DomainException("Usuario nao encontrado");

        //    ValidarEmail(usuarioBanco.email);
        //    usuario usuarioEmail = _repository.ObterPorEmail(usuarioDTO.Email);

        //    if (usuarioBanco.email == usuarioDTO.Email)
        //        throw new DomainException("Usuario com mesmo email encontrado!");

        //    usuarioBanco.senha = HashSenha(usuarioDTO.Senha);

        //    _repository.AtualizarSenha(usuarioBanco);

        //    return LerDto(usuarioBanco);


            
        //}
    }
}
