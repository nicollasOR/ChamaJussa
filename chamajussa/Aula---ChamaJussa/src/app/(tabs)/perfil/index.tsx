import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./perfil.styles"
import { useLocalSearchParams } from "expo-router";
import { autenticacaoService } from "../../../services/autenticacaoService";
import { Usuario } from "../../../@types/usuario";
import { useAuth } from "../../../context/authContext";
// type usuarioInterface = {
//   ...Usuario
// }
interface meuBotao extends TouchableOpacityProps {
  children: React.ReactNode
}

function botaoLogout({ children }: meuBotao) {
  <TouchableOpacity></TouchableOpacity>
}

export default function Perfil() {
  const { id } = useLocalSearchParams<{ id: string }>()
  function puxarNome() {
    const nickname = usuario?.nome.trim()
    const primeiroNome = nickname?.toLocaleString().charAt(0)
    return primeiroNome
  }


  const { usuario, logout } = useAuth()
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Título Principal */}
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity onPress={autenticacaoService.logout}>Logout</TouchableOpacity>

        {/* Card de Informações do Usuário */}
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{puxarNome()}</Text>
          </View>
          <Image
            source={require("../../../../assets/imgs/usuario.png")} // Substitua pela foto de perfil real
            style={styles.avatar}
          />
          <Text style={styles.userName}>{usuario?.nome}</Text>
          <Text style={styles.userEmail}>{usuario?.email}</Text>
        </View>

        {/* Botão de Sair da Conta */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={logout}
        >
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}