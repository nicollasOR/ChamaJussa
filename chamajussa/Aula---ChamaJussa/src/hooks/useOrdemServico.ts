import { useEffect, useState } from "react";
import { CriarOrdemServico, OrdemServico } from "../@types";
import { ordemServicoService } from "../services/ordemServicoService";
import { Alert } from "react-native";

export function useOrdemServico(){
    const [os, setOs] = useState<OrdemServico[]>([]);
    // let cadastrarOSS = ordemServicoService.cadastrar
    async function listarOs() {
        try {
            const dados = await ordemServicoService.listar();
            setOs(dados);
        } catch (error) {
            Alert.alert("Errisssiimooo!", "Listagem deu ruim 😥")
        }
    }

    async function cadastrarOS(e: CriarOrdemServico){
        try
        {
            const novaOS = await ordemServicoService.cadastrar(e)
            setOs((antigasOs) => [novaOS, ... antigasOs])
            return novaOS
        }

        catch(error: any)
        {
            Alert.alert(`Error!`, `Problema ao cadastrar`)
        }
    }

    useEffect(() =>{
        listarOs();
        
    }, [])

    return {os, cadastrarOS};
}