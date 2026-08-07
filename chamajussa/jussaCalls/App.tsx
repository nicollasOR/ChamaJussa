import { StatusBar } from 'expo-status-bar';
import { Image, TextStyle, ImageComponent, StyleSheet, Text, TouchableHighlight, View, TextInput,  } from 'react-native';
import { Login } from './src/app/login/login';
import { Perfil } from './src/app/perfil/Perfil';
import { Notificacoes } from './src/app/notificacoes/Notificacoes';
// import { Criar } from './src/pages/api/criarOS/Criar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Criar } from './src/app/criarOS/Criar';
import { DetalheOS } from './src/app/detalheOS/detalheOS';





// import { Login } from './src/pages/login/Login';
export default function App() {
  return (
    <>
      {/* AreaProvider => calcular o tamanho das extremidades (topo e rodape) */}
      {/* AreaView => aplica o padrao de margem necessaria para o tamanho do celular */}
      {/* <SafeAreaProvider style={styles.safeareaview}> */}
      {/* <SafeAreaView> */}
      {/* <StatusBar style='light'/> */}
      {/* <Login/> */}
      {/* </SafeAreaView> */}
      {/* </SafeAreaProvider> */}
      {/* <Criar /> */}
      <DetalheOS/>
    </>

  )
}
// DetalheOS
const styles = StyleSheet.create({
  safeareaview: {
    // flex: 1,
    backgroundColor: `#F3F4F6`
  }
})

// SafeAreaView



