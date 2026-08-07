import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navbar } from '../../components/navbar/Navbar'
import { } from "expo-image"
import { Wrench } from 'lucide-react-native'



export const DetalheOS = () => {
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
                        <View style={styles.linha_divisoria}/>
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


const styles = StyleSheet.create({

    body: {
        width: `100%`,
        height: `100%`,
        alignItems: `center`,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        backgroundColor: `#F3F4F6`,
        gap: 10
    },

    titulo: {
        fontSize: 22,

    },
    card: {
        backgroundColor: `white`,
        width: `80%`,
        height: `80%`,
        paddingVertical: 5,
        paddingHorizontal: 22,
        gap: 15
        // fontSize: 20,
    },
    card_titulo: {
        gap: 10
    },

    subTitulo: {
        fontSize: 18,
    },

    lined_card: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    lined: {
        fontSize: 16,
        color: `#757575`

    },

    card_info:
    {
        // width: 30\
        flexDirection: `row`,
        // justifyContent: `space-between`,
        alignItems: `center`,
        paddingHorizontal: 4,
        // marginTop: 1,
        gap: 10
    },

    card_infoImg: {
        flex: 1,
        width: 20,
        backgroundColor: '#0553',
    },

    card_infoTextos: {
        gap: 3
    },

    card_infoTitulo: {
        color: `#757575`,
        fontSize: 17.5
    },

    card_infoSubtitulo: {

        fontSize: 17.5
    },


    linha_divisoria:
    {   
        width: "100%",
        height: 2,
        backgroundColor: `#757575`,
        borderRadius: 2,
        alignSelf: `center`,
        marginTop: 2
    },

    card_descricao:
    {
        gap: 4
    },

    card_descricaoTitulo: {
        fontSize: 20
    },

    card_descricaoTexto: {
        fontSize: 16
    },


    card_imagem: {

    },

    card_imagemTitulo: {
        fontSize: 20
    },

    card_imagemFoto:
    {

    },

    botao: {

    },

    botaoTexto: {

    }



})