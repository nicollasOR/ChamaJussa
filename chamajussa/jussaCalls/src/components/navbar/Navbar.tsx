import { User, Bell, CirclePlus, ScrollText } from 'lucide-react-native'

import React from 'react'
import { StyleSheet, View, TouchableHighlight, Linking, Text } from 'react-native'


type propsLink = 'Minha OS' | `Criar OS` | `Notificacoes` | `Perfil`


export const Navbar = () => {



    const urlsBTW: Record<propsLink, string> = {
        "Minha OS": "listaOS",
        "Criar OS": "teste",
        Notificacoes: "fsafd",
        Perfil: "fdsfda"

    }

    const abrirLink = async (tipo: propsLink): Promise<void> => {
        const url = urlsBTW[tipo]

        const link = await Linking.canOpenURL(url)
        link ? await Linking.openURL(url)
            : console.log(`deu erro`)

    }


    return (
        <View style={styles.modal}>

            <TouchableHighlight style={styles.botao_nav} onPress={() => abrirLink(`Minha OS`)}>
                <View style={styles.conteudoBotao}>
                    <ScrollText color={`black`} size={24} />
                    <Text>Minha OS</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.botao_nav} >
                <View style={styles.conteudoBotao}>
                    <CirclePlus />
                    <Text>Criar OS</Text>
                </View>


            </TouchableHighlight>

            <TouchableHighlight style={styles.botao_nav} >
                <View style={styles.conteudoBotao}>
                    <Bell />
                    <Text>Notificações</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.botao_nav} >
                <View style={styles.conteudoBotao}>
                    <User />
                    <Text>Perfil</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}


const styles = StyleSheet.create({
    modal: {
        width: `100%`,
        flexDirection: `row`,
        gap: `8%`,
        justifyContent: "center",
        alignItems: `center`
        // backgroundColor: "black"
    },

    conteudoBotao: {
        flexDirection: `column`,
        alignContent: `center`,
        justifyContent: `center`
    },

    botao_nav: {

    }
})





{/* onPress={() => abrirLink(`minhaOS`)} */ }