import { api } from "./api";
import { localizacaoType } from "../@types";

export const localizacaoService = {
    async listar(): Promise<localizacaoType[]>{
        const response = await api.get<localizacaoType[]>(`Local`)
        return response.data
    }
}