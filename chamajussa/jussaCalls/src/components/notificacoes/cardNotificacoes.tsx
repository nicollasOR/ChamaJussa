import { Megaphone } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export const Card_Notificacoes = () => {
  return (
    <View style={styles.corpo}>
      <Image style={styles.img} source={require(`../../../assets/svg/megafone.svg`)} />
      <View style={styles.card}>
        <Text style={styles.titulo}>Ordem de Serviço finalizada</Text>
        <Text style={styles.subTitulo} numberOfLines={2} ellipsizeMode='tail'>Sua OS foi finalizada, logo ela voltará para sua sala.</Text>
                                      {/* cria o nmero maximo de linhas  */}
        <View style={styles.data}>

          <Text style={styles.dateTime}>22/06/2026</Text>
          <Text style={styles.hora}>16:03</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
// const styles = StyleSheet.create({
  corpo: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    columnGap: 12,
    alignItems: 'center',
    borderRadius: 15,
    width: '90%',
    boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.15)',
  },

  img: {

  },

  titulo: {
    fontSize: 18
  },
  card: {
    flex: 1, // Fundamental para o Texto saber onde aplicar a reticencia btw
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 4,
  },
  subTitulo: {
    fontSize: 14,
    color: '#4B5563',
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dateTime: { fontSize: 14 },
  hora: { fontSize: 14 },
})
// })
