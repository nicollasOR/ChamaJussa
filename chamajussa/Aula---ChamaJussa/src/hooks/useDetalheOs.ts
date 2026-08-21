import { useEffect, useState } from "react";
import { OrdemServico } from "../@types";
import { ordemServicoService } from "../services/ordemServicoService";

export function useDetalheOS(id: string) {
  //estados(useState), funções que chamam as func que fazem as requisicoes, useEffect
  const [os, setOs] = useState<OrdemServico | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarDetalhes() {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const dados = await ordemServicoService.buscarPorId(id);
      setOs(dados);
    } catch (err: any) {
      const mensagem =
        err.response?.data?.message ||
        err.response?.data ||
        "Não foi possível carregar os detalhes da os de serviço.";
      setError(
        typeof mensagem === "string" ? mensagem : JSON.stringify(mensagem),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDetalhes();
  }, [id]);

  // Helpers simples
  const formatarData = (dataStr?: string) => {
    if (!dataStr) return "";
    try {
      const data = new Date(dataStr);
      return isNaN(data.getTime()) ? dataStr : data.toLocaleString("pt-BR");
    } catch {
      return dataStr;
    }
  };

  const getImagemUrl = (img?: string) => {
    if (!img) return null;
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    const apiBase = (
      process.env.EXPO_PUBLIC_API_URL || "http://localhost:5015/api/"
    ).replace(/\/api\/?$/, "");
    return `${apiBase}/${img.replace(/^\//, "")}`;
  };

  const osIdentificador = os?.osId
    ? `OS-${String(os.osId).padStart(3, "0")}`
    : id
      ? `OS-${String(id).padStart(3, "0")}`
      : "OS";

  return {
    os,
    loading,
    error,
    carregarDetalhes,
    osIdentificador,
    imagemUrl: getImagemUrl(os?.imagem),
    dataCriacaoFormatada: formatarData(os?.dtCriacao),
  };
}
