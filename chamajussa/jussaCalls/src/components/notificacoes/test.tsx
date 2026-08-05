import { Megaphone } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export const Card_Notificacoes = () => {
  return (
    <View style={styles.corpo}>
      <Image style={styles.img} source={require(`../../../assets/svg/megafone.svg`)} />
      <View style={styles.card}>
        <Text style={styles.titulo}>Ordem de Serviço finalizada</Text>
        <Text style={styles.subTitulo}>Sua OS foi finalizada, logo ela voltará para sua sala.</Text>
        <View style={styles.data}>
          <Text style={styles.dateTime}>22/06/2026</Text>
          <Text style={styles.hora}>16:03</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  corpo: {
    backgroundColor: `white`,
    flexDirection: `row`,
    paddingVertical: 10,
    paddingHorizontal: 5,
    // alignItems: `center`,
    columnGap: 5,
    alignItems: `center`,
    height: "20%",
    boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.45)',
    borderRadius: 15,
    width: `90%`,

  },

  img: {
    width: 50,
    resizeMode: 'contain'
  },

  card:
  {
    flexDirection: `column`,
    justifyContent: `center`,
    // width: `100%`,
    height: `100%`,
    gap: 5
  },

  titulo: {
    fontSize: 18

  },

  subTitulo: {
    fontSize: 16,
    // flexWrap: 'nowrap',
    overflow: 'hidden'
    // text
  },

  data:
  {
    flexDirection: `row`,
    // justifyContent: `space-evenly`,
    gap: 125
    // justifyContent: `space-between`
  },

  dateTime: {
    fontSize: 16
  },

  hora:
  {
    fontSize: 16

  }


})
