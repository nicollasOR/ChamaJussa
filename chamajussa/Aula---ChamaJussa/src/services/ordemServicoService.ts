import { CriarOrdemServico, OrdemServico } from "../@types";
import { api } from "./api";

export const ordemServicoService = {
    async listar(): Promise<OrdemServico[]> {
        //requisicao:
        //Obs. se estamos trabalhando com lista não esqueça do [] array
        const resposta = await api.get<OrdemServico[]>("OS_/listagemTotal");

        return resposta.data;
    },
    // | - Cria um Union type
    // GET: Busca uma ordem de serviço por ID (/api/OrdemServico/{id})
    async buscarPorId(id: number | string): Promise<OrdemServico> {
        const resposta = await api.get<OrdemServico>(`OS_/${id}`);
        return resposta.data;
    },
    async cadastrar(dados: CriarOrdemServico): Promise<OrdemServico> {
        const formData = new FormData()
        formData.append('nomeItem', dados.nomeItem)
        formData.append('descricao', dados.descricao)
        formData.append('localizacaoId', String(dados.localizacaoId))
        if (dados.imagem) {
            const uri = dados.imagem.uri
            const fileName = dados.imagem?.name || `foto_${Date.now()}.jpg` || `foto_${Math.random()}`
            const match = /\.(w+)$/.exec(fileName)
            const mimeType = dados.imagem?.mimeType || (match ? `image/${match[1].toLowerCase()}` : 'ímage/jpeg')



            formData.append(`imagem`, { 
                uri, 
                name: fileName, 
                type: mimeType 
            } as any)


        }
        // formData.append('')
        const response = await api.post<OrdemServico>('OS_', formData, {
            headers: { 
                'Content-Type': 'multipart/form-data' 
            }
        })
        return response.data


    }
}


export const today = ordemServicoService.cadastrar