import { ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./cadastroOs.styles";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { listarLocalizacao } from "../../../hooks/useLocalizacao";
import { ImagemUpload } from "../../../@types";
import { useOrdemServico } from "../../../hooks/useOrdemServico";

// const LOCAIS_SETORES = [
//   { id: "1", nome: "Banheiro Masculino - Bloco B - 2º Andar" },
//   { id: "2", nome: "Banheiro Feminino - Bloco B - 2º Andar" },
//   { id: "3", nome: "Cozinha / Refeitório - Térreo" },
//   { id: "4", nome: "Almoxarifado Central" },
//   { id: "5", nome: "Laboratório de Informática - Bloco A" },
// ];

export default function CadastroOs() {
  const [localSelecionado, setLocalSelecionado] = useState<string>("");
  // const [localSelecionado, setLocalSelecionado] = useState<localizacaoType[]>([]);
  const cadOs = useOrdemServico()
  const locais = listarLocalizacao()
  const [nomeItem, setNomeItem] = useState<string>("")
  const [descricao, setDescricao] = useState("")
  const [img, setImg] = useState<ImagemUpload | null>(null)


  // async function

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Título Principal */}
      <Text style={styles.headerTitle}>Criar Ordem de Serviço</Text>


      {/* Card Principal */}
      <View style={styles.card}>
        {/* Se você tentar aplicar um padding: 20 usando a propriedade style comum em um ScrollView, a barra de rolagem vai cortar visualmente ou o comportamento de scroll pode quebrar nas extremidades. */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Título do problema *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Vazamento da pia"
              placeholderTextColor="#A0A0A0"
              onChangeText={(nome) => setOs}
              value={nomeItem}
            />
          </View>

          {/* <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Máquina / Equipamento *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Tubulação/Sifão da Pia"
              placeholderTextColor="#A0A0A0"

            />
          </View> */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Local / Setor *</Text>
            <View style={styles.pickerContainer}>
              {/* https://docs.expo.dev/versions/latest/sdk/picker/ ->  */}
              <Picker
                selectedValue={localSelecionado}
                onValueChange={(itemValue) => setLocalSelecionado(itemValue)}
                dropdownIconColor="#666"
                style={styles.picker}

              >

                {locais.map((localizacaoMap) => {
                  return (
                    <Picker.Item
                      label={`${localizacaoMap.localizacaoNome} - ${localizacaoMap.andar}`}
                      value={`${localizacaoMap.localizacaoId}`}
                      color="#A0A0A0"
                    />
                  )
                })}

              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Descrição do problema *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex: Há um vazamento constante..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={setDescricao}
              value={descricao}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Imagem / Foto do problema *</Text>
            <TouchableOpacity>
              <View style={styles.imagePlaceholder}>
                <Feather name="camera" size={20} color="#8E8E93" />
                <Text style={styles.imagePlaceholderText}>Insira imagem</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Botão de Ação */}
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={cadOs.cadastrarOS()}>
          <Text style={styles.buttonText}>Abrir Ordem de Serviço</Text>
        </TouchableOpacity>
      </View>



    </SafeAreaView>
  )
}