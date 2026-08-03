using System.Security.Claims;
using ChamaJussa_API.Applications.DTOs;
using ChamaJussa_API.Applications.DTOs.OrdemServicoDTO;
using ChamaJussa_API.Applications.Services;
using ChamaJussa_API.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChamaJussa_API.Controllers;

// [ApiController]
// [Route("[controller]")]
[Route("api/[controller]")]
[ApiController]
public class OS_Controller : ControllerBase
{
    private readonly OS_Service _service;

    public OS_Controller(OS_Service service) => _service = service;


        private Guid ObterUsuarioIdLogado()
        {
            string? idTexto = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(idTexto))
            {
                throw new DomainException("Usuário não autenticado");
            }

            return Guid.Parse(idTexto);
        }

        [HttpGet("listagemTotal")]
        public ActionResult<List<lerOrdemServicoDTO>> ListarOS()
        {
            List<lerOrdemServicoDTO> listagem = _service.ListagemTotal();
            if (listagem == null)
                return NotFound(listagem);

            return Ok(listagem);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<lerOrdemServicoDTO>> Adicionar([FromForm] criarOrdemServicoDTO osDto)
        {
            try
            {
                Guid usuarioId = ObterUsuarioIdLogado();
                var osCriada = await _service.AdicionarAsync(osDto, usuarioId);
                return StatusCode(201, osCriada);
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }
        
        [HttpGet]
        public ActionResult<List<lerOrdemServicoDTO>> Listar()
        {
            try
            {
                Guid usuarioId = ObterUsuarioIdLogado();
                var ordens = _service.ListarPorUsuario(usuarioId);
                return Ok(ordens);
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public ActionResult<lerOrdemServicoDTO> ObterPorId(int id)
        {
            try
            {
                var os = _service.ObterPorId(id);
                return Ok(os);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("{id}/imagem")]
        [AllowAnonymous]
        public ActionResult ObterImagem(int id)
        {
            try
            {
                string? urlOuImagem = _service.ObterImagem(id);
                if (string.IsNullOrWhiteSpace(urlOuImagem))
                {
                    return NotFound(new { mensagem = "Esta OS não possui imagem." });
                }

                if (urlOuImagem.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
                    urlOuImagem.StartsWith("https://", StringComparison.OrdinalIgnoreCase) ||
                    urlOuImagem.StartsWith("/"))
                {
                    return Redirect(urlOuImagem);
                }

                return Ok(new { url = urlOuImagem });
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("usuario/{usuarioId}")]
        public ActionResult<List<lerOrdemServicoDTO>> ListarPorUsuario(Guid usuarioId)
        {
            try
            {
                var ordens = _service.ListarPorUsuario(usuarioId);
                return Ok(ordens);
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpPatch("{id}/status")]
        [AllowAnonymous]
        public ActionResult<lerOrdemServicoDTO> AtualizarStatus(int id, [FromBody] atualizarStatusOrdemServicoDTO dto)
        {
            try
            {
                var osAtualizada = _service.AtualizarStatus(id, dto.StatusID);
                return Ok(osAtualizada);
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<lerOrdemServicoDTO>> Editar(int id, [FromForm] editarOrdemServicoDTO dto)
        {
            try
            {
                var osAtualizada = await _service.EditarAsync(id, dto);
                return Ok(osAtualizada);
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Deletar(int id)
        {
            try
            {
                _service.Deletar(id);
                return NoContent();
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }
    
    

}
