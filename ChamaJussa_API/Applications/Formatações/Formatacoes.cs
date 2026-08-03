using ChamaJussa_API.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace ChamaJussa_API.Applications.Formatações;

public class Formatacoes
{
     static byte[] HashSenha(string senha)
    {
        if (string.IsNullOrWhiteSpace(senha))
        {
            throw new DomainException("Senha é obrigatória.");
        }

        

        using var sha256 = SHA256.Create();
        return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
    }
    
    
}