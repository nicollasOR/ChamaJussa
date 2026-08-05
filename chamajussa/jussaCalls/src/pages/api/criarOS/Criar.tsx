import React from 'react'
import { StyleSheet, TextInput, Text, View } from 'react-native'
import { Navbar } from '../../../components/navbar/Navbar'
// import { TextInput } from 'react-native/types_generated/index'

export const Criar = () => {
  return (
    // <div>Criar</div>
    <View style={styles.body}>
        <Text style={styles.titulo}>Criar Ordem de Servico</Text>
        <View style={styles.main}>
            <View style={styles.campoInput}>
                <Text style={styles.campoInput_Titulo}></Text>
                <TextInput style={styles.campoInput_Input}></TextInput>
            </View>
        </View>
        <Navbar/>
    </View>
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
        marginVertical: 15
    },

    main: {
        backgroundColor: `white`,
        width: `80%`,
        height: `80%`,
        borderRadius: 20
    },


    campoInput: {

    },

    campoInput_Titulo: {

    },

    campoInput_Input: {

    },

    botao: {

    },

    botao_Texto: {

    }
})