import { useState } from "react"

export interface Login {
    email: string,
    senha: string
}

export interface LoginResponse{
    token: string
}

export interface oS {
    osId: number,
    nomeItem: string,
    solicitanteNome: string, 
    dtCriacao: string,
    localizacaoNome: string,
    descricao: string,
    statusNome: string
}

type oS2 = Omit<oS, 'descricao'>
const [teste, setTeste] = useState<oS2>()
