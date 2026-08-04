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

            <TouchableHighlight style={styles.subTitulo}>
                <Text>Sair da conta</Text>
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
        height: `70%`,
        alignItems: `center`,
        // justifyContent: `center`
        // backgroundColor: `black`,
        gap: 25
    },

    sideText: {
        alignSelf: "flex-start",
        fontSize: 24,
        fontWeight: "700"
    },

    card: {
        width: "80%",
        height: "70%",
        alignItems: "center",
        justifyContent : "center"
    },

    titulo: {

    },

    subTitulo: {

    }


})

