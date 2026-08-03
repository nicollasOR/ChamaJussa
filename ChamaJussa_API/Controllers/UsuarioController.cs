using ChamaJussa_API.Applications.DTOs;
using ChamaJussa_API.Applications.Services;
using ChamaJussa_API.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace ChamaJussa_API.Controllers;

// [ApiController]
// [Route("[controller]")]
[Route("api/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly UsuarioService _service;

    public UsuarioController(UsuarioService service) => _service = service;


    [HttpGet]
    public ActionResult<List<listarUsuarioDTO>> Listar()
    {
        List<listarUsuarioDTO> listagem = _service.Listar();
        if (listagem == null)
            return NotFound(listagem);
        
        return Ok(listagem);
    }

    // [HttpGet]
    // public ActionResult<List<listarUsuarioDTO>> Listar()
    // {
    //     List<listarUsuarioDTO> listagem = _service.Listar();
    //     if (listagem == null)
    //         return NotFound(listagem);
    //     
    //     return Ok(listagem);
    // }
    
    
    [HttpGet("nif/{nif}")]
    public ActionResult<listarUsuarioDTO> BuscarPorNIF(string nif)
    {
        try
        {
            listarUsuarioDTO listagem = _service.BuscarPorNif(nif);
            return Ok(listagem);
        }
        catch (DomainException e)
        {
            return NotFound(e.Message);
        }
    }
    
    
    [HttpGet("id/{id}")]
    public ActionResult<listarUsuarioDTO> BuscarPorNIF(Guid id)
    {
        try
        {
            listarUsuarioDTO listagem = _service.BuscarPorID(id);
            return Ok(listagem);
        }
        catch (DomainException e)
        {
            return NotFound(e.Message);
        }
    }
    
    [HttpPost]
    public ActionResult Criar(criarUsuarioDTO usuario)
    {
        try
        {
            _service.Adicionar(usuario);
            return Ok(usuario);
        }

        catch (DomainException ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpPatch("trocarSenha/{id}")]
    public ActionResult<atualizarSenhaDTO> TrocarSenha(Guid id,  atualizarSenhaDTO senha)
    {
        try
        {
            _service.atualizarSenha(id, senha);
            return NoContent();

        }

        catch (DomainException ex)
        {
            return BadRequest(ex.Message);
        }
    }

}
