import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login, LoginResponse } from "../@types/domains"
import { api } from "./api";
import * as SecureStore from "expo-secure-store"

// export async function LoginService(email: string, senha: string){
//     try {
//         const response = await api.post("Auth/Login", {email, senha})
//         const token = response.data.token

//         SecureStore.setItem("Token", token)
//     } catch (error: any) {
//         throw new Error(error.response.data)
        
//     }
// }


export const autenticacaoService = {
    // async function login(){
    // }
    async login(dados : Login) : Promise<LoginResponse>{
        //com essas {} ele muda o tipo da "data" para LoginResponse
        const {data} = await api.post<LoginResponse>("Auth/login", dados);
        if(data.token){
            //token -> "localstorage" (só que no react native)
            await AsyncStorage.setItem(process.env.EXPO_PUBLIC_TOKEN_KEY, data.token)
        }
        return data;
    }
}