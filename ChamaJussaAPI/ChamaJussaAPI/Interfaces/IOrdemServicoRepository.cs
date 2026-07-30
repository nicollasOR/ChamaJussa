using System;
using System.Collections.Generic;
using ChamaJussaAPI.Domains;

namespace ChamaJussaAPI.Interfaces
{
    public interface IOrdemServicoRepository
    {
        void Adicionar(OrdemDeServico os);
        void Atualizar(OrdemDeServico os);
        void Deletar(OrdemDeServico os);
        List<OrdemDeServico> ListarPorUsuario(Guid usuarioId);
        OrdemDeServico? ObterPorId(int id);
        bool LocalizacaoExiste(int localizacaoId);
        bool StatusExiste(int statusId);
        int ObterStatusInicialId();
        int? ObterFilaInicialId();
    }
}
