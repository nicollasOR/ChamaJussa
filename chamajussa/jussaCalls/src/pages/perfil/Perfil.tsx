import React from 'react'
import { View, StyleSheet, TouchableHighlight, Image, Text } from 'react-native'
import { Navbar } from '../../components/navbar/Navbar'


export const Perfil = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.sideText}>Perfil</Text>

            <View style={styles.card}>
                <Image source={require('../../../assets/svg/icon.svg')} />

                <Text style={styles.titulo}> Kessia Milena   </Text>
                <Text style={styles.subTitulo}> kessia@email.com </Text>
            </View>

            <TouchableHighlight style={styles.botao}>
                <Text style={styles.botao_text}>Sair da conta</Text>
            </TouchableHighlight>


            <Navbar />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        paddingVertical: 25,
        // paddingHorizontal: ,
        width: `100%`,
        height: `100%`,
        alignItems: `center`,
        // justifyContent: `center`
        // backgroundColor: `black`,
        gap: 50,
        backgroundColor: '#F3F4F6'
    },

    sideText: {
        alignSelf: "flex-start",
        fontSize: 24,
        fontWeight: "700",
        marginLeft: 10
    },

    card: {
        width: "90%",
        height: "60%",
        alignItems: "center",
        justifyContent : "center",
        backgroundColor: `white`,
        flexDirection: `column`,
        gap: 20
    },

    titulo: {
        fontSize: 22,
        textAlign: `center`

    },

    subTitulo: {
    },

    botao: {
        width: `80%`,
        alignItems: "center",
        backgroundColor: `#EF4444`,
        height: `5%`,
        borderRadius: `5px`,
        justifyContent: "center"
    },


    botao_text: {
        fontSize: 18
    }


})

