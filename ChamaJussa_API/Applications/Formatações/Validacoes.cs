using ChamaJussa_API.Exceptions;

namespace ChamaJussa_API.Applications.Formatações;

public class Validacoes
{
    private static void validarEmail(string email)
    {
        if (string.IsNullOrEmpty(email) || !email.Contains('@'))
            throw new DomainException("Email invalido");
        
    }

    private static void validarNIF(string nif)
    {
        if (string.IsNullOrEmpty(nif))
            throw new DomainException("NIF invalido");
    }
    
}