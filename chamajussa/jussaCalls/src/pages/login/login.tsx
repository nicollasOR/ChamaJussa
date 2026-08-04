// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, View, TextInput, Image } from 'react-native';

export const Login = () => {
  return (

    <View style={styles.loginSection}>
      <Image source={require('../../../assets/svg/jussaLogo.svg')} />

      <View style={styles.loginForm}>
        <Text style={styles.titulo}>Chama Jussa</Text>
        <Text style={styles.subTitulo}>Gerenciamento de Ordens de Serviço</Text>
        <View style={styles.inserirDados}>
          <Text style={styles.label}>Email</Text>
          <TextInput
          
          style={styles.input} placeholder='ola'></TextInput>
        </View>
        <View style={styles.inserirDados}>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} placeholder='ola'></TextInput>
        </View>

        <TouchableHighlight style={styles.botao}><Text style={styles.botao_texto}>Acessar o sistema</Text></TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#F3F4F6'

  },

  loginForm: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    alignItems: "center",
    borderRadius: 10,
    width: '85%',
    height: '50%',
    backgroundColor: 'white',
    gap: '5%'

  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },

  subTitulo: {
    fontSize: 16,
    color: '#8D8D8D',
    fontWeight: '600'
  },

  inserirDados: {
    width: '85%',
    height: '22%',
    gap: '6px',
  },

  label: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600'
  },

  input: {
    height: '60%',
    borderRadius: '5px',
    backgroundColor: '#F3F4F6',
    borderColor: 'transparent'

  },

  botao:{
    marginTop: 10,
    width: '70%',
    backgroundColor: '#10B981',
    height: '15%',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center'
  },

  botao_texto : {
    fontSize: 17,
    color: 'white',
    fontWeight: '600'
    
  }








});
// rafc