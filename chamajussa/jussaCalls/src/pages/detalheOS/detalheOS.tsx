import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navbar } from '../../components/navbar/Navbar'

export const DetalheOS = () => {
  return (
    // <div>ListaOS</div>

    <>
    <View style={styles.body}>
        <Text style={styles.titulo}>Detalhes da OS {/* colocar o numero ne*/}</Text>

    <View style={styles.card}>
    <View style={styles.card_titulo}>
        <Text style={styles.subTitulo}>Vazamento Hidraulico</Text>
        <Text style={styles.lined}>Criada em 17/06/2026, 11:29:58</Text>
    </View>
        <View style={styles.card_info}>
            <Image style={styles.card_infoImg} source={require(``)}></Image>
        <View style={styles.card_infoTextos}>
            <Text style={styles.card_infoTitulo}></Text>
            <Text style={styles.card_infoSubtitulo}></Text>
        </View>
        <View style={styles.linha_divisoria}></View>
        <View style={styles.card_descricao}>
            <Text style={styles.card_descricaoTitulo}></Text>
            <Text style={styles.card_descricaoTexto}></Text>
        </View>
        <View style={styles.card_imagem}>
            <Text style={styles.card_imagemTitulo}></Text>
            <Image style={styles.card_imagemFoto}></Image>
        </View>
        </View>
    
    </View>

    <TouchableOpacity style={styles.botao}><Text style={styles.botaoTexto}>Editar Solicitação</Text></TouchableOpacity>
    <Navbar/>
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
        fontSize: 18,

    },

    


    card: {

    },
    card_titulo:{

    },

    subTitulo:{

    },

    lined:{

    },

    card_info:
    {

    },

    card_infoImg: {

    },

    card_infoTextos: {

    },

    card_infoTitulo: {

    },

    card_infoSubtitulo: {

    },


    linha_divisoria:
    {

    },

    card_descricao:
    {

    },

    card_descricaoTitulo:{

    },

    card_descricaoTexto: {

    },


    card_imagem:{

    },

    card_imagemTitulo: {

    },

    card_imagemFoto:
    {

    },

    botao: {

    },

    botaoTexto: {

    }



})