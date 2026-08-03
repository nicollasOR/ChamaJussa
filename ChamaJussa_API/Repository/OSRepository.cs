using ChamaJussa_API.Contexts;
using ChamaJussa_API.Interface;
using ChamaJussa_API.Domains;
using Microsoft.EntityFrameworkCore;

namespace ChamaJussa_API.Repository;

public class OSRepository : IOSRepository
{
    private readonly JussaCalls2Context _context;

    public OSRepository(JussaCalls2Context context) => _context = context;
    
    public void Adicionar(OrdemServico os)
        {
            _context.OrdemServico.Add(os);
            _context.SaveChanges();
        }

    public List<OrdemServico> Listar()
    {
        return _context.OrdemServico.ToList();
    }

        public void Atualizar(OrdemServico os)
        {
            _context.OrdemServico.Update(os);
            _context.SaveChanges();
        }

        public void Deletar(OrdemServico os)
        {
            _context.OrdemServico.Remove(os);
            _context.SaveChanges();
        }

        public List<OrdemServico> ListarPorUsuario(Guid usuarioId)
        {
            return _context.OrdemServico
                .Include(os => os.Localizacao)
                .Include(os => os.usuarioSolicitanteNavigation)
                .Include(os => os.Status)
                .Include(os => os.Fila)
                .Where(os => os.usuarioSolicitante == usuarioId)
                .ToList();

            
        }

        public OrdemServico? ObterPorId(int id)
        {
            // return _context.OrdemServico
            //     .Include(os => os.localizacao)
            //     .Include(os => os.solicitanteNavigation)
            //     .Include(os => os.statusNavigation)
            //     .Include(os => os.filaNavigation)
            //     .FirstOrDefault(os => os.os_id == id);

            return _context.OrdemServico
                .Include(os => os.Localizacao)
                .Include(os => os.usuarioSolicitanteNavigation)
                .Include(os => os.Status)
                .Include(os => os.Fila)
                .FirstOrDefault(os => os.OS_ID == id);

        }

        public bool LocalizacaoExiste(int localizacaoId)
        {
            return _context.Localizacao.Any(l => l.LocalizacaoID == localizacaoId);
        }

        public bool StatusExiste(int statusId)
        {
            return _context.Status_OS.Any(s => s.StatusID == statusId);
        }

        public int ObterStatusInicialId()
        {
            var statusAberto = _context.Status_OS
                .FirstOrDefault
                (s => s.NomeStatus.ToLower() == "aberto" 
                                     || s.NomeStatus.ToLower() == "aberta");

            if (statusAberto != null)
            {
                return statusAberto.StatusID;
            }

            var primeiroStatus = _context.Status_OS.OrderBy
                (s => s.StatusID).FirstOrDefault();
            if (primeiroStatus != null)
            {
                return primeiroStatus.StatusID;
            }

            var novoStatus = new Status_OS() { NomeStatus = "Aberto" };
            _context.Status_OS.Add(novoStatus);
            _context.SaveChanges();
            return novoStatus.StatusID;
        }

        public int? ObterFilaInicialId()
        {
            var primeiraFila = _context.Fila.OrderBy
                (f => f.FilaID).FirstOrDefault();
            if (primeiraFila != null)
            {
                return primeiraFila.FilaID;
            }

            var novaFila = new Fila { NomeFila = "Geral" };
            _context.Fila.Add(novaFila);
            _context.SaveChanges();
            return novaFila.FilaID;
        }
}