// import React from 'react';
// import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { styles } from './listaOs.styles';
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

//     if (error || !ordem) {
//         return (
//             <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
//                 <View style={styles.headerRow}>
//                     <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
//                         <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>Detalhes da OS</Text>
//                 </View>
//                 <View style={styles.centerContainer}>
//                     <Text style={styles.errorText}>{error || 'Ordem de serviço não encontrada.'}</Text>
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
//                         <Text style={styles.title}>{ordem.nomeItem}</Text>
//                         {ordem.statusNome ? (
//                             <View style={styles.statusBadge}>
//                                 <Text style={styles.statusText}>{ordem.statusNome}</Text>
//                             </View>
//                         ) : null}
//                     </View>

//                     {ordem.dtCriacao ? (
//                         <Text style={styles.date}>Criada em {dataCriacaoFormatada}</Text>
//                     ) : null}

//                     <View style={styles.infoRow}>
//                         <Entypo name="tools" size={24} color="#0878F9" style={styles.icon} />
//                         <View>
//                             <Text style={styles.label}>Máquina / Equipamento</Text>
//                             <Text style={styles.value}>{ordem.nomeItem || 'Não informado'}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.infoRow}>
//                         <Ionicons name="location-outline" size={22} color="#FF3B30" style={styles.icon} />
//                         <View>
//                             <Text style={styles.label}>Local / Setor</Text>
//                             <Text style={styles.value}>{ordem.localizacaoNome || 'Não informado'}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.infoRow}>
//                         <Feather name="user" size={20} color="#34C759" style={styles.icon} />
//                         <View>
//                             <Text style={styles.label}>Solicitante</Text>
//                             <Text style={styles.value}>{ordem.solicitanteNome || 'Não informado'}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <Text style={styles.sectionTitle}>Descrição do Problema</Text>
//                     <Text style={styles.descriptionText}>
//                         {ordem.descricao || 'Sem descrição informada.'}
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