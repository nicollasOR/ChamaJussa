import { Usuario } from "../@types/usuario";
import { api } from "./api";


export async function listarUsuario() : Promise<Usuario>{
        const response = await api.get<Usuario>("Usuario")
        return response.data
}

export async function listarUsuarioID(usuarioID: string): Promise<Usuario>{
        const response = await api.get<Usuario>("Usuario/id/" + usuarioID)
        return response.data


}