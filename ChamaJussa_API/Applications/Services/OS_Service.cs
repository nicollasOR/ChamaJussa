using ChamaJussa_API.Applications.DTOs.OrdemServicoDTO;
using ChamaJussa_API.Interface;
using ChamaJussa_API.Domains;
using ChamaJussa_API.Exceptions;

namespace ChamaJussa_API.Applications.Services;

public class OS_Service
{
    private readonly IOSRepository _repository;
    private readonly IStorageRepository _service;

    public OS_Service(IOSRepository repository, IStorageRepository service)
    {
        _repository = repository;
        _service = service;
    }
    
    private static lerOrdemServicoDTO ConverterParaDto(OrdemServico os)
        {
            return new lerOrdemServicoDTO
            {
                OsId = os.OS_ID,
                NomeItem = os.NomeItem,
                Solicitante = os.usuarioSolicitante,
                SolicitanteNome = os.usuarioSolicitanteNavigation?.Nome,
                DtCriacao = os.dataCriacao,
                LocalizacaoId = os.LocalizacaoID,
                LocalizacaoNome = os.Localizacao != null ? $"{os.Localizacao.Nome} (Andar: {os.Localizacao.Andar})" : null,
                Descricao = os.Descricao,
                Imagem = os.Imagem,
                StatusId = os.StatusID,
                StatusNome = os.Status?.NomeStatus,
                FilaId = os.FilaID,
                FilaNome = os.Fila?.NomeFila
            };
        }

    public List<lerOrdemServicoDTO> ListagemTotal()
    {
        List<OrdemServico> listagem = _repository.Listar();

        List<lerOrdemServicoDTO> returnList = listagem.Select(varAux => ConverterParaDto(varAux)).ToList();

        return returnList;
    }

        public async Task<lerOrdemServicoDTO> AdicionarAsync(criarOrdemServicoDTO osDto, Guid usuarioId)
        {
            if (string.IsNullOrWhiteSpace(osDto.NomeItem))
            {
                throw new DomainException("Nome do item é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(osDto.Descricao))
            {
                throw new DomainException("Descrição é obrigatória.");
            }

            if (osDto.LocalizacaoId.HasValue && !_repository.LocalizacaoExiste(osDto.LocalizacaoId.Value))
            {
                throw new DomainException("A localização informada não existe.");
            }

            // Realiza upload no Supabase Storage se a imagem for fornecida
            string? urlImagem = null;
            if (osDto.Imagem != null && osDto.Imagem.Length > 0)
            {
                urlImagem = await _service.UploadImagemAsync(osDto.Imagem);
            }

            int statusIdInicial = _repository.ObterStatusInicialId();
            int? filaIdInicial = _repository.ObterFilaInicialId();

            OrdemServico os = new OrdemServico
            {
                NomeItem = osDto.NomeItem,
                usuarioSolicitante = usuarioId,
                dataCriacao = DateTime.Now,
                LocalizacaoID = osDto.LocalizacaoId,
                Descricao = osDto.Descricao,
                Imagem = urlImagem,
                StatusID = statusIdInicial,
                FilaID = filaIdInicial
            };

            _repository.Adicionar(os);

            // Recarrega a OS do banco de dados para popular as entidades navegacionais
            var osBanco = _repository.ObterPorId(os.OS_ID);
            return osBanco != null ? ConverterParaDto(osBanco) : ConverterParaDto(os);
        }

        public List<lerOrdemServicoDTO> ListarPorUsuario(Guid usuarioId)
        {
            List<OrdemServico> ordens = _repository.ListarPorUsuario(usuarioId);
            return ordens.Select(os => ConverterParaDto(os)).ToList();
        }

        public lerOrdemServicoDTO ObterPorId(int id)
        {
            OrdemServico? os = _repository.ObterPorId(id);
            if (os == null)
            {
                throw new DomainException("Ordem de serviço não encontrada.");
            }
            return ConverterParaDto(os);
        }

        public string? ObterImagem(int id)
        {
            OrdemServico? os = _repository.ObterPorId(id);
            if (os == null)
            {
                throw new DomainException("Ordem de serviço não encontrada.");
            }
            return os.Imagem;
        }

        private static bool IsStatusAberto(OrdemServico os)
        {
            if (os.Status != null && !string.IsNullOrWhiteSpace(os.Status.NomeStatus))
            {
                return string.Equals(os.Status.NomeStatus, "Aberto", StringComparison.OrdinalIgnoreCase) ||
                       string.Equals(os.Status.NomeStatus, "Aberta", StringComparison.OrdinalIgnoreCase);
            }
            return os.StatusID == 1;
        }

        public async Task<lerOrdemServicoDTO> EditarAsync(int id, editarOrdemServicoDTO dto)
        {
            OrdemServico? os = _repository.ObterPorId(id);
            if (os == null)
            {
                throw new DomainException("Ordem de serviço não encontrada.");
            }

            if (!IsStatusAberto(os))
            {
                throw new DomainException("A Ordem de Serviço não pode ser editada pois seu status já foi modificado.");
            }

            if (!string.IsNullOrWhiteSpace(dto.NomeItem))
            {
                os.NomeItem = dto.NomeItem;
            }

            if (!string.IsNullOrWhiteSpace(dto.Descricao))
            {
                os.Descricao = dto.Descricao;
            }

            if (dto.LocalizacaoId.HasValue)
            {
                if (!_repository.LocalizacaoExiste(dto.LocalizacaoId.Value))
                {
                    throw new DomainException("A localização informada não existe.");
                }
                os.LocalizacaoID = dto.LocalizacaoId.Value;
            }

            if (dto.Imagem != null && dto.Imagem.Length > 0)
            {
                os.Imagem = await _service.UploadImagemAsync(dto.Imagem);
            }

            _repository.Atualizar(os);

            var osAtualizada = _repository.ObterPorId(os.OS_ID);
            return osAtualizada != null ? ConverterParaDto(osAtualizada) : ConverterParaDto(os);
        }

        public void Deletar(int id)
        {
            OrdemServico? os = _repository.ObterPorId(id);
            if (os == null)
            {
                throw new DomainException("Ordem de serviço não encontrada.");
            }

            if (!IsStatusAberto(os))
            {
                throw new DomainException("A Ordem de Serviço não pode ser excluída pois seu status já foi modificado.");
            }

            _repository.Deletar(os);
        }

        public lerOrdemServicoDTO AtualizarStatus(int id, int statusId)
        {
            OrdemServico? os = _repository.ObterPorId(id);
            if (os == null)
            {
                throw new DomainException("Ordem de serviço não encontrada.");
            }

            if (!_repository.StatusExiste(statusId))
            {
                throw new DomainException("O status informado não existe.");
            }

            os.StatusID = statusId;
            _repository.Atualizar(os);

            var osAtualizada = _repository.ObterPorId(os.OS_ID);
            return osAtualizada != null ? ConverterParaDto(osAtualizada) : ConverterParaDto(os);
        }
}