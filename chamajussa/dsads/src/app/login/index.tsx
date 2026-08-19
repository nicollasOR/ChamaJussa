import { View, Image, StyleSheet, TextInput, Button, Text, TouchableOpacity, TouchableHighlight, Alert } from "react-native";
import { Botao, Colors, Title } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { autenticacaoService } from "../../services/authService";
// import { LoginService } from "../../services/authService";
// import { autenticacaoService } from "../../@types/autenticacao";

type loginInfo = {
    email: string,
    senha: string
}

export default function Login() {
    const router = useRouter(); // <--- Use o hook aqui
    // const [login2, setLogin] = useState<loginInfo>()
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")



    function entrar() {
        // router.navigate("/listaOs");
        // ou: router.push("/listaOS");
        router.replace("/listaOs");
    }

    async function acessai() {
        if (!email.trim() || !senha.trim()) {
            Alert.alert("Atenção, preencha os campos abaixo.")
            return
        }
        try {
            await autenticacaoService.login({email, senha})
            console.log("e")
            console.log(email, senha)
            router.replace("/listaOs")
        } catch (error: any) {
            Alert.alert("faz o L pae") 
        }
    }
    // async function LoginUsuario() { 
    //     try {
    //         await LoginService(email, senha)
    //         setTimeout(() => {
    //             entrar()
    //         }, 2000)
    //     }

    //     catch (error: any) {
    //         throw new Error(error.response.data)
    //     }
    // }


    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.container}>
                
                <Image
                    source={require('../../../assets//imgs/logo.png')}
                    style={styles.logo}
                />
                <View style={styles.form}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Chama Jussa</Text>
                        <Text style={styles.sub_title}>Gerenciamento de Ordens de Serviço</Text>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChangeText={setEmail}
                            
                            
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            
                            
                            secureTextEntry 
                            
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </View>

                    <TouchableOpacity style={styles.btn_login} onPress={acessai}>
                        <Text style={styles.buttonText}>Acessar o sistema</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safearea: { flex: 1 },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    logo: {
        width: 200,
        height: 200,
        // resizeMode: 'contain', // Garante que a imagem não fique distorcida
    },
    form: {
        backgroundColor: "#ffff",
        borderRadius: 10,
        width: 350,
        padding: 25,
        gap: 20,
        // justifyContent: 'space-evenly',

        // --- LÓGICA DA SOMBRA ---

        // 1. Para o Android (Usa um sistema baseado em níveis de elevação)
        elevation: 4,

        // 2. Para o iOS (Permite controle fino como no CSS web)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.1,                   // Opacidade/Intensidade
        shadowRadius: 8,                      // Nível de desfoque (blur)
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        // marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    inputGroup: {
        // Garante o espaçamento entre um bloco e outro
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8, // Espaço entre o texto do rótulo e a caixa do input
    },
    text: {
        alignItems: 'center'
    },
    title: {
        //puxa um de cada vez
        // fontSize: Title.fontSize,
        // fontWeight: Title.fontWeight,
        //puxa tudo
        ...Title,
        alignItems: 'center'

    },
    sub_title: {
        color: Colors.textSecondary
    },
    btn_login: {
        backgroundColor: Colors.btn_verde,
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#ffff',
        alignSelf: 'center',
        ...Botao,
        // fontFamily: "Montserrat-Regular"
    }
});

// const Login = () =>{
//     return(
//         <></>
//     )
// }


// export default Login;