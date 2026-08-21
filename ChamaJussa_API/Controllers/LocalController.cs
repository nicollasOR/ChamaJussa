using ChamaJussa_API.Applications.DTOs.AuthDTO;
using ChamaJussa_API.Applications.Services;
using ChamaJussa_API.Domains;
using ChamaJussa_API.Exceptions;
using ChamaJussa_API.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ChamaJussa_API.Controllers;

// [ApiController]
// [Route("[controller]")]
[Route("api/[controller]")]
[ApiController]
public class LocalController : ControllerBase
{
    private readonly ILocalRepository _service;

    public LocalController(ILocalRepository service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<Localizacao>> Listar()
    {

        var Local = _service.Listar();
        return Local;
    }
}