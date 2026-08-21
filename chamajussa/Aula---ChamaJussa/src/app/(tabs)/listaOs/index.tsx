import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./listaOs.styles"
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../../components/footer/Footer";
import CardOs from "../../../components/cardOs";
import { useOrdemServico } from "../../../hooks/useOrdemServico";
import { OrdemServico } from "../../../@types";

export default function ListaOs() {

  const os = useOrdemServico();
  
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View style={styles.superior}>
          <View>
            <Text style={styles.titulo}>Olá, Késsia</Text>
            <Text style={styles.titulo_lista}>Minhas OSs</Text>
          </View>
        </View>
        <View style={styles.filtros}>
          <Pressable style={styles.filterbtn}>
            <Text style={styles.filterbtntxt}>Todos</Text>
          </Pressable>
          <Pressable style={styles.filterbtn}>
            <Text style={styles.filterbtntxt}>Aberto</Text>
          </Pressable>
          <Pressable style={styles.filterbtn}>
            <Text style={styles.filterbtntxt}>Em Andamento</Text>
          </Pressable>
          <Pressable style={styles.filterbtn}>
            <Text style={styles.filterbtntxt}>Concluídas</Text>
          </Pressable>
        </View>
        <FlatList
          data={os}
          keyExtractor={(item) => String(item.osId)}
          // keyExtractor={(item: OrdemServico) => String(item.osId)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            //card:
            <CardOs 
            numOs={item.osId}
            status={item.statusNome}
            titulo={item.nomeItem}
            descricao={item.descricao}/>
          )}
        />
      </View>
      {/* <Footer /> */}
    </SafeAreaView>
  )
}
