import axios from "axios";
import { Platform } from "react-native";

import * as SecureStore from "expo-secure-store"
import AsyncStorage from "@react-native-async-storage/async-storage";


const plataformaB = Platform.OS === `android` ? '10.0.2.2' : 'localhost'
const porta = process.env.EXPO_PUBLIC_PORTA
const apiLocal = process.env.EXPO_PUBLIC_API || `https://${plataformaB}:${porta}/api/`
const apiTeste = "https://localhost:7253/api/"
// const enderecoApi = process.env.EXPO_PUBLIC_API_URL || `http://${host}:${porta}`;

// let local = `${plataformaB}:${apiLocal}`

export const api = axios.create({
    baseURL: apiTeste, // apiLocal
    timeout: 1000
})



api.interceptors.request.use(async (config) => {
    // const token = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY)
    const token = await AsyncStorage.getItem(process.env.EXPO_PUBLIC_TOKEN_KEY)
    token ?? config.headers.Authorization == `Bearer ${token}`

    return config
})