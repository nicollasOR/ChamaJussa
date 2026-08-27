import { api } from "./api";

import { Fila } from "../@types/fila";
// import { api } from "./api";

export const FilaService = {
    async listar(): Promise<Fila[]>{
        const resposta = await api.get<Fila[]>("Fila");
        return resposta.data;
    }
}