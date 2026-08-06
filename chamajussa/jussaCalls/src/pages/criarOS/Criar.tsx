import React from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native'
import { Navbar } from '../../components/navbar/Navbar'
import { stylesFont } from '../../const/fonts'
// import { Navbar } from '../../../components/navbar/Navbar'
// Navbar
// import { TextInput } from 'react-native/types_generated/index'

export const Criar = () => {
  return (
    // <div>Criar</div>
    <View style={styles.body}>
        <Text style={styles.title}>Criar Ordem de Servico</Text>
        <View style={styles.main}>
            <View style={styles.campoInput}>
                <Text style={styles.campoInput_Titulo}>Titulo do problema *</Text>
                <TextInput style={styles.campoInput_Input} placeholder='Ex: vazamento da pia'/> {/*</View></View></TextInput>*/}
            </View>
            <View style={styles.campoInput}>
                <Text style={styles.campoInput_Titulo}>Máquina / Equipamento *</Text>
                <TextInput style={styles.campoInput_Input} placeholder='Ex: vazamento da pia'/> {/*</View></View></TextInput>*/}
            </View>
            <View style={styles.campoInput}>
                <Text style={styles.campoInput_Titulo}>Local / Setor *</Text>
                <TextInput style={[styles.campoInput_Input, styles.descricao]} 
                // numberOfLines={5}
                 placeholder='Ex: vazamento da pia'/> {/*</View></View></TextInput>*/}
            </View>
            <View style={styles.campoInput}>
                <Text style={styles.campoInput_Titulo}>Descrição do problema *</Text>
                <TextInput style={styles.campoInput_Input} placeholder='Ex: vazamento da pia'/> {/*</View></View></TextInput>*/}
            </View>
            <View style={styles.campoInput}>
                <Text style={styles.campoInput_Titulo}>Descrição do problema *</Text>
                <TextInput style={styles.campoInput_Input} placeholder='Ex: vazamento da pia'/> {/*</View></View></TextInput>*/}
            </View>
            <TouchableOpacity style={styles.botao}><Text style={styles.botao_Texto}>Abrir Ordem de Serviço</Text></TouchableOpacity>
        </View>
        <Navbar />
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

    title: {
        fontSize: 22,
        marginVertical: 15,
        // fontFamily: stylesFont.fontFamily
        // ...stylesFont

    },

    main: {
        backgroundColor: `white`,
        width: `85%`,
        height: `80%`,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 15
    },


    descricao: {
        fontFamily: `inter`
    },


    campoInput: {
        justifyContent: `center`,
        gap: 4,
        height: `15%`,
        width: `100%`,
        // alignItems: `center`,
        // backgroundColor: `black`
    },

    campoInput_Titulo: {
        fontSize: 16,
        fontWeight: `600`
    },

    campoInput_Input: {
        backgroundColor: `#F3F4F6`,
        height: `100%`,
        borderRadius: 5,
        paddingLeft: 5
    },

    botao: {
        width: `80%`,
        height: `7%`,
        backgroundColor: `#10B981`,
        alignItems: `center`,
        justifyContent: `center`,
        alignSelf: `center`,
        borderRadius: 10,
        // marginTop: 
        // color: `white`
    },

    botao_Texto: {
        color: `#FFFFFF`,
        fontWeight: `600`,
        fontSize: 16
    }
})