using System;
using System.Collections.Generic;
using ChamaJussaAPI.Domains;

namespace ChamaJussaAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        List<usuario> Listar();
        usuario? ObterPorId(Guid id);
        usuario? ObterPorEmail(string email);
        usuario? ObterPorNif(int nif);
        
        bool EmailExiste(string email);
        void Adicionar(usuario usuario);
        void Atualizar(usuario usuario);

        void AtualizarSenha(usuario usuario);

    }
}
