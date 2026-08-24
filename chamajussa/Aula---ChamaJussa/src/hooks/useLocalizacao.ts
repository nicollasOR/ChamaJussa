import { useEffect, useState } from "react";
import { localizacaoType } from "../@types";
import { localizacaoService } from "../services/localizacaoService";


export function listarLocalizacao(){
    const [localizacao, setLocalizacao] = useState<localizacaoType[]>([])

    async function listarLocalizacoes(){
        try
    {
            const response = await localizacaoService.listar()
            setLocalizacao(response)
        }

        catch(error: any)
        {
            error.response?.data.message.message || "Localizações não encontradas" 
        }
    }


    useEffect(() => {
        listarLocalizacoes()

    }, [])

    return localizacao
}