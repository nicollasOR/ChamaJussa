using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ChamaJussaAPI.Domains;
using ChamaJussaAPI.DTOs.OrdemServicoDto;
using ChamaJussaAPI.Exceptions;
using ChamaJussaAPI.Interfaces;

namespace ChamaJussaAPI.Applications.Services
{
    public class OrdemServicoService
    {
        private readonly IOrdemServicoRepository _repository;
        private readonly IStorageService _storageService;

        public OrdemServicoService(IOrdemServicoRepository repository, IStorageService storageService)
        {
            _repository = repository;
            _storageService = storageService;
        }

        private static LerOrdemServicoDto ConverterParaDto(OrdemDeServico os)
        {
            return new LerOrdemServicoDto
            {
                OsId = os.os_id,
                NomeItem = os.nome_item,
                Solicitante = os.solicitante,
                SolicitanteNome = os.solicitanteNavigation?.nome,
                DtCriacao = os.dt_criacao,
                LocalizacaoId = os.localizacao_id,
                LocalizacaoNome = os.localizacao != null ? $"{os.localizacao.nome} (Andar: {os.localizacao.andar})" : null,
                Descricao = os.descricao,
                Imagem = os.imagem,
                StatusId = os.status,
                StatusNome = os.statusNavigation?.nome,
                FilaId = os.fila,
                FilaNome = os.filaNavigation?.nome
            };
        }

        public async Task<LerOrdemServicoDto> AdicionarAsync(CriarOrdemServicoDto osDto, Guid usuarioId)
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
                urlImagem = await _storageService.UploadImagemAsync(osDto.Imagem);
            }

            int statusIdInicial = _repository.ObterStatusInicialId();
            int? filaIdInicial = _repository.ObterFilaInicialId();

            OrdemDeServico os = new OrdemDeServico
            {
                nome_item = osDto.NomeItem,
                solicitante = usuarioId,
                dt_criacao = DateTime.Now,
                localizacao_id = osDto.LocalizacaoId,
                descricao = osDto.Descricao,
                imagem = urlImagem,
                status = statusIdInicial,
                fila = filaIdInicial
            };

            _repository.Adicionar(os);

            // Recarrega a OS do banco de dados para popular as entidades navegacionais
            var osBanco = _repository.ObterPorId(os.os_id);
            return osBanco != null ? ConverterParaDto(osBanco) : ConverterParaDto(os);
        }

        public List<LerOrdemServicoDto> ListarPorUsuario(Guid usuarioId)
        {
            List<OrdemDeServico> ordens = _repository.ListarPorUsuario(usuarioId);
            return ordens.Select(os => ConverterParaDto(os)).ToList();
        }

        public LerOrdemServicoDto ObterPorId(int id)
        {
            OrdemDeServico? os = _repository.ObterPorId(id);
            if (os == null)
            {
                throw new DomainException("Ordem de serviço não encontrada.");
            }
            return ConverterParaDto(os);
        }

        public string? ObterImagem(int id)
        {
            OrdemDeServico? os = _repository.ObterPorId(id);
            if (os == null)
            {
                throw new DomainException("Ordem de serviço não encontrada.");
            }
            return os.imagem;
        }

        private static bool IsStatusAberto(OrdemDeServico os)
        {
            if (os.statusNavigation != null && !string.IsNullOrWhiteSpace(os.statusNavigation.nome))
            {
                return string.Equals(os.statusNavigation.nome, "Aberto", StringComparison.OrdinalIgnoreCase) ||
                       string.Equals(os.statusNavigation.nome, "Aberta", StringComparison.OrdinalIgnoreCase);
            }
            return os.status == 1;
        }

        public async Task<LerOrdemServicoDto> EditarAsync(int id, EditarOrdemServicoDto dto)
        {
            OrdemDeServico? os = _repository.ObterPorId(id);
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
                os.nome_item = dto.NomeItem;
            }

            if (!string.IsNullOrWhiteSpace(dto.Descricao))
            {
                os.descricao = dto.Descricao;
            }

            if (dto.LocalizacaoId.HasValue)
            {
                if (!_repository.LocalizacaoExiste(dto.LocalizacaoId.Value))
                {
                    throw new DomainException("A localização informada não existe.");
                }
                os.localizacao_id = dto.LocalizacaoId.Value;
            }

            if (dto.Imagem != null && dto.Imagem.Length > 0)
            {
                os.imagem = await _storageService.UploadImagemAsync(dto.Imagem);
            }

            _repository.Atualizar(os);

            var osAtualizada = _repository.ObterPorId(os.os_id);
            return osAtualizada != null ? ConverterParaDto(osAtualizada) : ConverterParaDto(os);
        }

        public void Deletar(int id)
        {
            OrdemDeServico? os = _repository.ObterPorId(id);
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

        public LerOrdemServicoDto AtualizarStatus(int id, int statusId)
        {
            OrdemDeServico? os = _repository.ObterPorId(id);
            if (os == null)
            {
                throw new DomainException("Ordem de serviço não encontrada.");
            }

            if (!_repository.StatusExiste(statusId))
            {
                throw new DomainException("O status informado não existe.");
            }

            os.status = statusId;
            _repository.Atualizar(os);

            var osAtualizada = _repository.ObterPorId(os.os_id);
            return osAtualizada != null ? ConverterParaDto(osAtualizada) : ConverterParaDto(os);
        }
    }
}
