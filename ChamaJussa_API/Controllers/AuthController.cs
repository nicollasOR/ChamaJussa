using ChamaJussa_API.Applications.DTOs.AuthDTO;
using ChamaJussa_API.Applications.Services;
using ChamaJussa_API.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace ChamaJussa_API.Controllers;

// [ApiController]
// [Route("[controller]")]
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _service;

    public AuthController(AuthService service)
    {
        _service = service;
    }

    [HttpPost("login")]
    public ActionResult<tokenJWT> Login(loginDTO loginDto)
    {
        try
        {
            var token = _service.Login(loginDto);
            return Ok(token);
        }
        catch (DomainException ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }
}