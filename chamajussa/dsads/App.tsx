import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Login from './src/app/login';
import ListaOS from './src/app/(tabs)/listaOs';
//Para usar essa carinha, precisa instalar:
//npx expo install react-native-safe-area-context
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      console.log("deu bom")
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safearea}>
      {/* SafeAreaProvider--> O que ele faz: Ele conversa direto com o sistema operacional do celular (seja Android ou iOS) e medida a tela. Ele calcula exatamente quantos pixels a câmera frontal toma no topo e quantos pixels a barra de navegação toma no rodapé. */}
        {/* <Text>Hello World!! 🤪</Text> */}
        {/* esse status bar, muda a cor do "menu" conforme cor da tela */}
        <StatusBar style="auto" />
        {/* <StatusBar style="light" />  --> OS ÍCONES FICAM BRANCOS*/}
        {/* <StatusBar style="dark" --> OS ÍCONES FICAM PRETOS /> */}
        <Login />
        {/* <ListaOS /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

//O nosso CSS virou um objeto!
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
});
