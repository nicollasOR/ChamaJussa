import { useEffect, useState } from "react";
import { oS } from "../@types";
import { ordemServicoService } from "../services/ordemServico";
import ListaOS from "../app/(tabs)/listaOs";
import { Alert } from "react-native";

export function OS_Service() {
    const [os, setOS] = useState<oS[]>([])
    const[loading, setLoading] = useState<true>()
    const [error, setError] = useState<string | null>(null)


    async function listarOS() {
        try {
            setLoading(true)
            setError(null)
            const dados = await ordemServicoService.listar()
            setOS(dados)
        }

        catch(error: any)
        {
            setError('deu erro no carregamento')
        }

        finally {
            Alert.alert("Eh")
        }
    }
    
    useEffect(() => {
        listarOS()
    }, [])

    
    return {
        os,
        loading,
        error,
        recarregar: ordemServicoService
    }
}