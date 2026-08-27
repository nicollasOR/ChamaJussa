import { ScrollView, View, Text, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./cadastroOs.styles";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { listarLocalizacao } from "../../../hooks/useLocalizacao";
import { CriarOrdemServico, ImagemUpload } from "../../../@types";
import { useOrdemServico } from "../../../hooks/useOrdemServico";
import * as ImagePicker from "expo-image-picker";

// const LOCAIS_SETORES = [
//   { id: "1", nome: "Banheiro Masculino - Bloco B - 2º Andar" },
//   { id: "2", nome: "Banheiro Feminino - Bloco B - 2º Andar" },
//   { id: "3", nome: "Cozinha / Refeitório - Térreo" },
//   { id: "4", nome: "Almoxarifado Central" },
//   { id: "5", nome: "Laboratório de Informática - Bloco A" },
// ];

export default function CadastroOs() {

    const localizacao = listarLocalizacao()
    const [localSelecionado, setLocalSelecionado] = useState<string>("");
    // const [localSelecionado, setLocalSelecionado] = useState<localizacaoType[]>([]);
    const { cadastrarOS } = useOrdemServico()
    const locais = listarLocalizacao()
    const [nomeItem, setNomeItem] = useState<string>("")
    const [descricao, setDescricao] = useState("")
    const [filaSelecionada, setFilaSelecionada] = useState<string>("")
    const [img, setImg] = useState<ImagemUpload | null>(null)


    // async function

     async function handleSalvar() {
    // Validação básica
    if (!nomeItem.trim() || !descricao.trim() || !localSelecionado) {
      Alert.alert("⚠ Atenção", "Preencha todos os campos obrigatórios (*).");
      return;
    }

    // Monta o objeto final para mandar pro hook
    const novaOs: CriarOrdemServico = {
      nomeItem: nomeItem,
      localizacaoId: localSelecionado,
      descricao: descricao,
      imagem: img,
      
    };

    const sucesso = await cadastrarOS(novaOs);

    // Limpa os campos se deu certo
    if (sucesso) {
      setNomeItem("");
      setLocalSelecionado("");
      setDescricao("");
      setImg(null);

      Alert.alert("Cadastro realizado 😸", "OS criada com sucesso!");
    }
  }

  // 1. Função para abrir a CÂMERA
  async function tirarFoto() {
  // Pede autorização ao usuário para acessar a câmera física do aparelho.
  // A propriedade 'granted' retorna 'true' se o usuário aceitou ou 'false' se recusou.
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      Alert.alert("Permissão necessária", "Permita o acesso à câmera para tirar fotos.");
      return;
    }

  // Abre a interface nativa da câmera para o usuário tirar a foto
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,// Permite que o usuário corte ou ajuste a foto após o clique
      quality: 0.7, // Reduz a qualidade da imagem (70%) para não sobrecarregar o upload/banco
    });

    // Verifica se o usuário concluiu a foto (não cancelou) e se a imagem foi capturada com sucesso
    if (!resultado.canceled && resultado.assets[0]) {
      // Pega a foto que acabou de ser tirada
      const foto = resultado.assets[0]; 
      // Atualiza o estado 'imagem' com os dados necessários para o envio (FormData/API)
      setImg({
        uri: foto.uri,
        name: foto.fileName || `foto_${Date.now()}.jpg`,
        mimeType: foto.mimeType || "image/jpeg",
      });
    }
  }

  // 2. Função para abrir a GALERIA
  async function escolherDaGaleria() {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert("Permissão necessária", "Permita o acesso à galeria.");
      return;
    }
// Abre a galeria de fotos do celular
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
// Se o usuário selecionou uma foto e não fechou a galeria sem escolher
    if (!resultado.canceled && resultado.assets[0]) {
      const foto = resultado.assets[0];
      setImg({
        uri: foto.uri,
        name: foto.fileName || `foto_${Date.now()}.jpg`,
        mimeType: foto.mimeType || "image/jpeg",
      });
    }
  }

  // 3. Menu de Opções ao clicar no botão de imagem
  function selecionarOpcaoImagem() {
    Alert.alert(
      "Selecionar Foto",
      "De onde você quer obter a foto?",
      [
        { text: "Câmera", onPress: tirarFoto },
        { text: "Galeria", onPress: escolherDaGaleria },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  }

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
                            // onChangeText={(nome) => setOs}
                            value={nomeItem}
                            onChangeText={setNomeItem}
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
                            {img?.uri 
                            ? (
                            <Image source={{ uri: img.uri }} style={{ width: "100%", height: 140, borderRadius: 8 }} resizeMode="cover" />) 
                                : (
                                <>                
                                <Feather name="camera" size={20} color="#8E8E93" />
                                <Text style={styles.imagePlaceholderText}>Insira imagem</Text>
                                </>
                            )}

                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/* Botão de Ação */}
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={cadastrarOS()}>
                    <Text style={styles.buttonText}>Abrir Ordem de Serviço</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaView>
    )
}