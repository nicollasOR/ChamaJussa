import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navbar } from '../../components/navbar/Navbar'
// import { } from "expo-image"
import { Wrench } from 'lucide-react-native'
import { styles } from "./listaOs.styles"

import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDetalheOS } from '../../hooks/useDetalheOs';
import { useLocalSearchParams, useRouter } from 'expo-router';


export const DetalheOS = () => {

    // const {id} = useLocalSearchParams<(id: string)>()



    return (
        // <div>ListaOS</div>x=

        <>
            <View style={styles.body}>
                <Text style={styles.titulo}>Detalhes da OS 0008-SO {/* colocar o numero ne*/}</Text>

                <View style={styles.card}>
                    <View style={styles.card_titulo}>
                        <Text style={styles.subTitulo}>Vazamento Hidraulico</Text>
                        <View style={styles.lined_card}>
                            <Text style={styles.lined}>Criada em 17/06/2026</Text>
                            <Text style={styles.lined}>11:29:58</Text>

                        </View>
                    </View>
                    <View style={styles.card_info}>
                        <Wrench />
                        <View style={styles.card_infoTextos}>
                            <Text style={styles.card_infoTitulo}>Máquina / Equipamento</Text>
                            <Text style={styles.card_infoSubtitulo}>Tubulação/Sifão da Pia</Text>
                        </View>
                    </View>
                    <View style={styles.card_info}>
                        <Wrench />
                        <View style={styles.card_infoTextos}>
                            <Text style={styles.card_infoTitulo}>Local / Setor</Text>
                            <Text style={styles.card_infoSubtitulo}>Banheiro Masculino</Text>
                        </View>
                    </View>
                    <View style={styles.card_info}>
                        <Wrench />
                        <View style={styles.card_infoTextos}>
                            <Text style={styles.card_infoTitulo}>Solicitante</Text>
                            <Text style={styles.card_infoSubtitulo}>Kessia Milena</Text>
                        </View>
                    </View>
                    <View style={styles.linha_divisoria} />
                    <View style={styles.card_descricao}>
                        <Text style={styles.card_descricaoTitulo}>Descrição do Problema</Text>
                        <Text style={styles.card_descricaoTexto}>Há um vazamento constante de água por baixo da pia do banheiro masculino do segundo andar do Bloco B. Está alagando o chão e causando risco de queda.</Text>
                    </View>
                    <View style={styles.card_imagem}>
                        <Text style={styles.card_imagemTitulo}>Foto do problema</Text>
                    </View>

                </View>

                <TouchableOpacity style={styles.botao}><Text style={styles.botaoTexto}>Editar Solicitação</Text></TouchableOpacity>
                <Navbar />
            </View>

        </>
    )
}





















// import { styles } from './listaOs.styles';
// import React from 'react';
// import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDetalheOS } from '../../hooks/useDetalheOs';
// import { useLocalSearchParams, useRouter } from 'expo-router';

// export default function DetalheOS() {
//     const router = useRouter();
//     const { id } = useLocalSearchParams<{ id: string }>();

//     const {
//         os,
//         loading,
//         error,
//         carregarDetalhes,
//         osIdentificador,
//         imagemUrl,
//         dataCriacaoFormatada,
//     } = useDetalheOS(id);

//     if (loading) {
//         return (
//             <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
//                 <View style={styles.headerRow}>
//                     <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
//                         <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>Detalhes da {osIdentificador}</Text>
//                 </View>
//                 <View style={styles.centerContainer}>
//                     <ActivityIndicator size="large" color="#0878F9" />
//                     <Text style={styles.loadingText}>Carregando detalhes da OS...</Text>
//                 </View>
//             </SafeAreaView>
//         );
//     }

//     if (error || !os) {
//         return (
//             <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
//                 <View style={styles.headerRow}>
//                     <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
//                         <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>Detalhes da OS</Text>
//                 </View>
//                 <View style={styles.centerContainer}>
//                     <Text style={styles.errorText}>{error || 'os de serviço não encontrada.'}</Text>
//                     <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={carregarDetalhes} activeOpacity={0.7}>
//                         <Text style={styles.buttonText}>Tentar novamente</Text>
//                     </TouchableOpacity>
//                 </View>
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
//             <View style={styles.headerRow}>
//                 <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
//                     <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Detalhes da {osIdentificador}</Text>
//             </View>

//             <View style={styles.card}>
//                 <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//                     <View style={styles.titleRow}>
//                         <Text style={styles.title}>{os.nomeItem}</Text>
//                         {os.statusNome ? (
//                             <View style={styles.statusBadge}>
//                                 <Text style={styles.statusText}>{os.statusNome}</Text>
//                             </View>
//                         ) : null}
//                     </View>

//                     {os.dtCriacao ? (
//                         <Text style={styles.date}>Criada em {dataCriacaoFormatada}</Text>
//                     ) : null}

//                     <View style={styles.infoRow}>
//                         <Entypo name="tools" size={24} color="#0878F9" style={styles.icon} />
//                         <View>
//                             <Text style={styles.label}>Máquina / Equipamento</Text>
//                             <Text style={styles.value}>{os.nomeItem || 'Não informado'}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.infoRow}>
//                         <Ionicons name="location-outline" size={22} color="#FF3B30" style={styles.icon} />
//                         <View>
//                             <Text style={styles.label}>Local / Setor</Text>
//                             <Text style={styles.value}>{os.localizacaoNome || 'Não informado'}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.infoRow}>
//                         <Feather name="user" size={20} color="#34C759" style={styles.icon} />
//                         <View>
//                             <Text style={styles.label}>Solicitante</Text>
//                             <Text style={styles.value}>{os.solicitanteNome || 'Não informado'}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <Text style={styles.sectionTitle}>Descrição do Problema</Text>
//                     <Text style={styles.descriptionText}>
//                         {os.descricao || 'Sem descrição informada.'}
//                     </Text>

//                     <Text style={styles.sectionTitle}>Foto do Problema</Text>
//                     {imagemUrl ? (
//                         <Image source={{ uri: imagemUrl }} style={styles.problemImage} resizeMode="cover" />
//                     ) : (
//                         <View style={styles.noImageContainer}>
//                             <Feather name="image" size={32} color="#CBD5E1" />
//                             <Text style={styles.noImageText}>Nenhuma foto anexada a esta OS</Text>
//                         </View>
//                     )}
//                 </ScrollView>
//             </View>

//             <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => router.back()}>
//                 <Text style={styles.buttonText}>Voltar para Lista</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// }



