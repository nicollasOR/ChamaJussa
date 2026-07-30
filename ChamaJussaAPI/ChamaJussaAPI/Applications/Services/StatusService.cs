using ChamaJussaAPI.Interfaces;
using ChamaJussaAPI.Domains;
using ChamaJussaAPI.DTOs.StatusDto;
using ChamaJussaAPI.Exceptions;
namespace ChamaJussaAPI.Applications.Services
{
    public class StatusService
    {
        private readonly IStatusRepository _repository;

        public StatusService(IStatusRepository repository) => _repository = repository;

        private static LerStatusDTO lerDTO(status status)
        {
            return new LerStatusDTO
            {
                nome = status.nome
            };
        }

        public List<LerStatusDTO> Listar()
        {
            List<status> statusList = _repository.Listar();
            return statusList.Select(lista => lerDTO(lista)).ToList();
        }

        public LerStatusDTO BuscarPorNome(LerStatusDTO statusDTO)
        {
            status? statusBanco = _repository.BuscarPorStatus(statusDTO.nome);
            if (statusBanco == null)
                throw new DomainException("Status nao encontrado");

            return lerDTO(statusBanco);
        }
    }
}
