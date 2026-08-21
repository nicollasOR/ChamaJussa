import { useEffect, useState } from "react";
import { Usuario } from "../@types/usuario";
import { listarUsuarioID } from "../services/usuarioService";

export function usuarioID(usuarioID: string){
    const [usuario, setUsuario] = useState<Usuario>()
    
async function buscarUsuario(){
    if(!usuarioID) 
        return

    try
    {
        const dados = await listarUsuarioID(usuarioID)
        setUsuario(dados)
    }

    catch(error: any)
    {
        error.response?.data.message || "Não foi possível carregar usuário"
    }
}
}