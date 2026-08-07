// import { View } from 'lucide-react'
import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { Navbar } from '../../components/navbar/Navbar'
import { Card_Notificacoes } from '../../components/notificacoes/cardNotificacoes'


export const Notificacoes = () => {
  return (
    <View style={styles.body}> 
        <Text style={styles.titulo}>Notificações</Text>
        <Card_Notificacoes/>
        <Card_Notificacoes/>
    <Navbar/>
    </View>

  )
}


const styles = StyleSheet.create({
    body: {
        width: `100%`,
        height: `100%`,
        flexDirection: `column`,
        alignItems: `center`,
        // marginVertical: 20,
        gap: 20,
        backgroundColor: `#F3F4F6`
    },

    titulo:{
        fontSize: 22
    }
})