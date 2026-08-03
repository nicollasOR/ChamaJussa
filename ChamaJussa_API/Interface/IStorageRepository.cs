namespace ChamaJussa_API.Interface;

public interface IStorageRepository
{
    public Task<string> UploadImagemAsync(IFormFile img);
}