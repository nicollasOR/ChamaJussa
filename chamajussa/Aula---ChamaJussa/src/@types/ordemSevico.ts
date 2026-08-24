//LISTAGEM DE OS - para os cards E tela de detalhamento da OS
import * as ImagePicker from 'expo-image-picker';

export type ImagemUpload = {
    uri: string,
    name?: string,
    mimeType: string
}

export interface OrdemServico{
    osId: number,
    nomeItem: string,
    solicitanteNome: string,
    dtCriacao: string,
    localizacaoNome: string,
    descricao: string,
    imagem?: string,
    statusNome: string,
    filaNome: string
}
 
export interface CriarOrdemServico
{
    nomeItem: string,
    localizacaoId: number,
    descricao: string,
    imagem: ImagemUpload | null
}