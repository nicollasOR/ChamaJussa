using System;
using System.Collections.Generic;
using System.Linq;
using ChamaJussaAPI.Contexts;
using ChamaJussaAPI.Domains;
using ChamaJussaAPI.Interfaces;

namespace ChamaJussaAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ChamaJussaContext _context;

        public UsuarioRepository(ChamaJussaContext context)
        {
            _context = context;
        }

        public List<usuario> Listar()
        {
            return _context.usuario.ToList();
        }

        public usuario? ObterPorId(Guid id)
        {
            return _context.usuario.Find(id);
        }

        public usuario? ObterPorEmail(string email)
        {
            return _context.usuario.FirstOrDefault(u => u.email == email);
        }

        public bool EmailExiste(string email)
        {
            return _context.usuario.Any(u => u.email == email);
        }

        public void Adicionar(usuario usuario)
        {
            _context.usuario.Add(usuario);
            _context.SaveChanges();
        }

        public void Atualizar(usuario usuario)
        {
            usuario usuarioBanco = _context.usuario.FirstOrDefault(usuarioAux => usuarioAux.usuario_id == usuario.usuario_id);

            if(usuarioBanco != null)
            {
                usuarioBanco.nif = usuario.nif;
                usuarioBanco.email = usuario.email;
                usuarioBanco.nome = usuario.nome;

                _context.SaveChanges();
            }
        }

        public usuario ObterPorNif(int nif)
        {
            return _context.usuario.FirstOrDefault(usuarioAux => usuarioAux.nif == nif);
        }

        public void AtualizarSenha(usuario usuario)
        {
            if (usuario == null)
                return;

            usuario usuarioBanco = _context.usuario.Find(usuario.usuario_id);

            if (usuarioBanco == null)
                return;

            usuarioBanco.senha = usuario.senha;

            _context.SaveChanges();
        }
    }
}
