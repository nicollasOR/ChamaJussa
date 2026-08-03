using ChamaJussa_API.Interface;

namespace ChamaJussa_API.Applications.Services;

public class localStorageService : IStorageRepository
{
    private readonly IWebHostEnvironment _env;

    public localStorageService(IWebHostEnvironment env) => _env = env;
    
    public async Task<string?> UploadImagemAsync(IFormFile arquivo)
    {
        if (arquivo == null || arquivo.Length == 0)
        {
            return null;
        }

        // Define a pasta wwwroot/uploads
        string rootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        string uploadsFolder = Path.Combine(rootPath, "uploads");

        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        // Gera um nome único para o arquivo local
        var extensao = Path.GetExtension(arquivo.FileName);
        var nomeArquivo = $"os-{Guid.NewGuid()}{extensao}";
        var caminhoCompleto = Path.Combine(uploadsFolder, nomeArquivo);

        using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
        {
            await arquivo.CopyToAsync(stream);
        }

        // Retorna o caminho relativo estático (ex: /uploads/os-xxxx.jpg)
        return $"/uploads/{nomeArquivo}";
    }
}