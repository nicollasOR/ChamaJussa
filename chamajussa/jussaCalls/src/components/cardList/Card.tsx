import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// Text



export const Card = () => {
  return (
    // <div>Card</div>
    <>
    <View style={styles.card}>
        <View style={styles.card_header}>
            <Text style={styles.card_headerID}></Text>
            <Text style={styles.card_headerStatus}></Text>
        </View>

        <Text style={styles.card_conteudoTitulo}></Text>
        <Text style={styles.card_conteudoDescricao}></Text>
    </View>
    </>
  )
}


const styles = StyleSheet.create({
    card: {

    },

    card_header: {

    },

    card_headerID: {

    },

    card_headerStatus: {

    },

    card_conteudo: {

    },

    card_conteudoTitulo: {

    },

    card_conteudoDescricao: {

    }

    
})