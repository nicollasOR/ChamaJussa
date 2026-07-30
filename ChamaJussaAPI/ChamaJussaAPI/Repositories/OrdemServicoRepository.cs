using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ChamaJussaAPI.Contexts;
using ChamaJussaAPI.Domains;
using ChamaJussaAPI.Interfaces;

namespace ChamaJussaAPI.Repositories
{
    public class OrdemServicoRepository : IOrdemServicoRepository
    {
        private readonly ChamaJussaContext _context;

        public OrdemServicoRepository(ChamaJussaContext context)
        {
            _context = context;
        }

        public void Adicionar(OrdemDeServico os)
        {
            _context.OrdemDeServico.Add(os);
            _context.SaveChanges();
        }

        public void Atualizar(OrdemDeServico os)
        {
            _context.OrdemDeServico.Update(os);
            _context.SaveChanges();
        }

        public void Deletar(OrdemDeServico os)
        {
            _context.OrdemDeServico.Remove(os);
            _context.SaveChanges();
        }

        public List<OrdemDeServico> ListarPorUsuario(Guid usuarioId)
        {
            return _context.OrdemDeServico
                .Include(os => os.localizacao)
                .Include(os => os.solicitanteNavigation)
                .Include(os => os.statusNavigation)
                .Include(os => os.filaNavigation)
                .Where(os => os.solicitante == usuarioId)
                .ToList();
        }

        public OrdemDeServico? ObterPorId(int id)
        {
            return _context.OrdemDeServico
                .Include(os => os.localizacao)
                .Include(os => os.solicitanteNavigation)
                .Include(os => os.statusNavigation)
                .Include(os => os.filaNavigation)
                .FirstOrDefault(os => os.os_id == id);
        }

        public bool LocalizacaoExiste(int localizacaoId)
        {
            return _context.localizacao.Any(l => l.localizacao_id == localizacaoId);
        }

        public bool StatusExiste(int statusId)
        {
            return _context.status.Any(s => s.status_id == statusId);
        }

        public int ObterStatusInicialId()
        {
            var statusAberto = _context.status
                .FirstOrDefault(s => s.nome.ToLower() == "aberto" || s.nome.ToLower() == "aberta");

            if (statusAberto != null)
            {
                return statusAberto.status_id;
            }

            var primeiroStatus = _context.status.OrderBy(s => s.status_id).FirstOrDefault();
            if (primeiroStatus != null)
            {
                return primeiroStatus.status_id;
            }

            var novoStatus = new status { nome = "Aberto" };
            _context.status.Add(novoStatus);
            _context.SaveChanges();
            return novoStatus.status_id;
        }

        public int? ObterFilaInicialId()
        {
            var primeiraFila = _context.fila.OrderBy(f => f.fila_id).FirstOrDefault();
            if (primeiraFila != null)
            {
                return primeiraFila.fila_id;
            }

            var novaFila = new fila { nome = "Geral" };
            _context.fila.Add(novaFila);
            _context.SaveChanges();
            return novaFila.fila_id;
        }
    }
}
