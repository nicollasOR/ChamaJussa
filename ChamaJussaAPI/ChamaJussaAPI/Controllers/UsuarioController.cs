using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ChamaJussaAPI.Applications.Services;
using ChamaJussaAPI.DTOs.UsuarioDto;
using ChamaJussaAPI.Exceptions;

namespace ChamaJussaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<LerUsuarioDto>> Listar()
        {
            var usuarios = _service.Listar();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public ActionResult<LerUsuarioDto> ObterPorId(Guid id)
        {
            try
            {
                var usuario = _service.ObterPorId(id);
                return Ok(usuario);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("email/{email}")]
        public ActionResult<LerUsuarioDto> ObterPorEmail(string email)
        {
            try
            {
                var usuario = _service.ObterPorEmail(email);
                return Ok(usuario);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("nif/{nif}")]
        public ActionResult<LerUsuarioDto> ObterPorNif(int nif)
        {
            try
            {
                var usuarioBanco = _service.BuscarPorNif(nif);
                return Ok(usuarioBanco);

            }

            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<LerUsuarioDto> Adicionar(CriarUsuarioDto usuarioDto)
        {
            try
            {
                var usuarioCriado = _service.Adicionar(usuarioDto);
                return StatusCode(201, usuarioCriado);
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpPut]
        public ActionResult<LerUsuarioDto> Atualizar(Guid id, CriarUsuarioDto usuarioDTO)
        {
            try
            {
                var usuario = _service.Atualizar(id, usuarioDTO);
                return Ok(usuario);
            }

            catch(DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
