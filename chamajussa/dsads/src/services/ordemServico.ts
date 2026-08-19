import { oS } from "../@types";
import { api } from "./api";

export const ordemServicoService = {
    async listar(): Promise<oS[]>{
        const resposta = await api.get<oS[]>("OrdemServico")
        return resposta.data
    }
}