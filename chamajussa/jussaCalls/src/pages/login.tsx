// import { StatusBar } from 'expo-status-bar';
import { ImageComponent, StyleSheet, Text, TouchableHighlight, View, TextInput, Image } from 'react-native';
// // import { TextInput } from 'react-native/types_generated/index';

export const Login = () => {
    return (
    <View style={styles.loginSection}>
      <Image style={styles.img} source={require('../../assets/svg/jussaLogo.svg')} />

      <View style={styles.loginForm}>
        <Text style={styles.titulo}>Chama Jussa</Text>
        <Text style={styles.subTitulo}>Gerenciamento de Ordens de Serviço</Text>
        <View>
          <Text>Email</Text>
          <TextInput></TextInput>
        </View>
        <View>
          <Text>Senha</Text>
          <TextInput></TextInput>
        </View>

        <TouchableHighlight><Text>Acessar o sistema</Text></TouchableHighlight>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    loginSection: { 
    alignItems: "center",
    justifyContent: "center"
    
    },

    img: {
        width: "100%",
        height: "100%"
    },

    loginForm: {
        alignItems: "center",
        justifyContent: "center"
    },

    titulo: {

    },

    subTitulo: {

    },

    inserirDados: {

    },


    




    
});
// //rafc