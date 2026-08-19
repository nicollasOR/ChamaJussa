import { Text, TouchableOpacity, View, Pressable, SafeAreaView, FlatList, ActivityIndicator } from "react-native"
import { styles } from './ListaOS.styles';
import { OS_Service } from "../../../hooks/useOrdemServico";
import { oS } from "../../../@types";
import { useState } from "react";
import { router } from "expo-router";

// const ordens = [
//     {
//         id: "1",
//         numero: "OS-001",
//         status: "Aberta",
//         titulo: "Vazamento hidráulico no Bloco B",
//         descricao:
//             "Há um vazamento constante de água por baixo da pia do banheiro masculino do segundo andar...",
//     },
//     {
//         id: "2",
//         numero: "OS-002",
//         status: "Em Andamento",
//         titulo: "Computador sem internet",
//         descricao:
//             "O computador do laboratório 4 não está conseguindo acessar a internet.",
//     },
//     {
//         id: "3",
//         numero: "OS-003",
//         status: "Concluída",
//         titulo: "Projetor queimado",
//         descricao:
//             "Foi realizada a troca da lâmpada do projetor.",
//     },
//     {
//         id: "4",
//         numero: "OS-003",
//         status: "Concluída",
//         titulo: "Projetor queimado",
//         descricao:
//             "Foi realizada a troca da lâmpada do projetor.",
//     },
//     {
//         id: "3",
//         numero: "OS-003",
//         status: "Concluída",
//         titulo: "Projetor queimado",
//         descricao:
//             "Foi realizada a troca da lâmpada do projetor.",
//     },
//     {
//         id: "3",
//         numero: "OS-003",
//         status: "Concluída",
//         titulo: "Projetor queimado",
//         descricao:
//             "Foi realizada a troca da lâmpada do projetor.",
//     },
//     {
//         id: "3",
//         numero: "OS-003",
//         status: "Concluída",
//         titulo: "Projetor queimado",
//         descricao:
//             "Foi realizada a troca da lâmpada do projetor.",
//     },
//     {
//         id: "3",
//         numero: "OS-003",
//         status: "Concluída",
//         titulo: "Projetor queimado",
//         descricao:
//             "Foi realizada a troca da lâmpada do projetor.",
//     },
// ];

export default function ListaOS() {

    const { os, loading, error, recarregar } = OS_Service()

    const [ordem, setOrdem] = useState<string>("")
    const [filtros, setFiltros] = useState<string>("")

    const filtrar = os.filter((osAux) => {
        if (filtros === `Todos`)
            return true
        const statusAtual = osAux.statusNome || ''
        return statusAtual.toLowerCase().includes(filtros.toLowerCase())
    })

    return (
        <>
            <View style={styles.container}>
                <View style={styles.superior}>
                    <View>
                        <Text style={styles.titulo}>Olá, Késsia</Text>
                        <Text style={styles.titulo_lista}>Minhas OSs</Text>
                    </View>
                    {/* <TouchableOpacity style={styles.btn_nova_os}>
                        <Text style={styles.btn_text}>Nova OS</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.filtros}>
                    {['Todos', 'Aberto', 'Cancelado', 'Concluído', 'Em andamento'].map((statusAux) => (
                        <Pressable
                            key={statusAux}
                            style={[
                                styles.filterbtn,
                                filtros === statusAux && { backgroundColor: '#0052CC' },
                            ]}
                            onPress={() => router.replace("../login")}
                        >
                            <Text style={styles.filterbtntxt}>{statusAux}</Text>
                        </Pressable>
                    ))}
                    {/* <Pressable style={styles.filterbtn}>
                        <Text style={styles.filterbtntxt}>Todos</Text>
                    </Pressable>
                    <Pressable style={styles.filterbtn}>
                        <Text style={styles.filterbtntxt}>Aberto</Text>
                    </Pressable>
                    <Pressable style={styles.filterbtn}>
                        <Text style={styles.filterbtntxt}>Em Andamento</Text>
                    </Pressable>
                    <Pressable style={styles.filterbtn}>
                        <Text style={styles.filterbtntxt}>Concluídas</Text>
                    </Pressable> */}
                </View>
                {loading && ordem.length === 0 || null ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0878F9" />
                        <Text style={{ marginTop: 12, color: '#6B7280' }}>Carregando ordens de serviço...</Text>
                    </View>
                )
                    : error && os.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            <Text style={{ fontSize: 16, color: '#DC2626', textAlign: 'center', marginBottom: 16 }}>
                                {error}
                            </Text>
                            <TouchableOpacity
                                style={[styles.btn_nova_os, { backgroundColor: '#0878F9' }]}
                                onPress={() => recarregar}
                            >
                                <Text style={styles.btn_text}>Tentar novamente</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <FlatList
                            data={filtrar} //ordem
                            keyExtractor={(item: oS) => item.osId?.toString()} // String(item.osId)
                            showsVerticalScrollIndicator={false}
                            refreshing={loading}
                            // onRefresh={() => recarregar()}

                            ListEmptyComponent={
                                <View style={{ alignItems: 'center', marginTop: 40 }}>
                                    <Text style={{ color: '#9CA3AF', fontSize: 16 }}>
                                        Nenhuma ordem de serviço encontrada.
                                    </Text>
                                </View>
                            }
                            renderItem={({ item }) => (
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.card,
                                        pressed && styles.cardPressed,
                                    ]}
                                >
                                    <View style={styles.cardTopo}>
                                        <Text style={styles.numero}>{item.osId}</Text>

                                        <View style={styles.statusContainer}>
                                            <Text style={styles.status}>{item.statusNome}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.tituloCard}>{item.nomeItem}</Text>

                                    <Text style={styles.descricao} numberOfLines={3}>
                                        {item.descricao}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    )

                }


            </View>
        </>
    )
}