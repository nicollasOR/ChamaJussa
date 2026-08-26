import React, { createContext, ReactNode, use, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { AuthContextData, Login, LoginResponse, Usuario, UsuarioPayload } from "../@types";
import { autenticacaoService } from "../services/autenticacaoService";

// Chave que usamos para guardar o token no armazenamento do celular (AsyncStorage)
const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY || "ChaveToken";

// 1. Criamos o Contexto que vai guardar os dados globais de login
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const router = useRouter()

// 2. Função auxiliar: recebe a string do token JWT e extrai o id, nome e e-mail do usuário
export function decodificarToken(token: string): Usuario | null {
  try {
    // Decodifica a string criptografada do JWT em um objeto JS
    const decoded = jwtDecode<UsuarioPayload>(token);

    // Mapeia as chaves (claims) do backend para o nosso objeto Usuario
    return {
      id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || "",
      nome: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "",
      email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "",
    };
  } catch {
    // Se o token for inválido ou estiver corrompido, retorna null
    return null;
  }
}

                        // React.ComponentFuncional

    export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
        const [usuario, setUsuario] = useState<Usuario | null>(null)
        const [token, setToken] = useState<string | null>(null)
        const [loading, setLoading] = useState<boolean>(true)
    


        useEffect(() => {
            AsyncStorage.getItem(process.env.EXPO_PUBLIC_TOKEN_KEY || "ChaveToken").then((tokenSalvo) => {
                if(tokenSalvo)
                {
                    setToken(tokenSalvo)
                    setUsuario(decodificarToken(tokenSalvo))
                }
            }).finally(() => setLoading(false))
        }, [])
    


        async function login(dados: Login) {
            const response = await autenticacaoService.login(dados)

            if(response.token)
            {
                setToken(response.token)
                setUsuario(decodificarToken(response.token))
            }
            

        }

        async function logout() {
            await AsyncStorage.removeItem(process.env.EXPO_PUBLIC_TOKEN_KEY || "ChaveToken")
            setToken(null)
            setUsuario(null)
            router.replace("/login")
        }

        return(
            <AuthContext.Provider value={{login, logout, usuario, token, loading}}>
                {children}
            
            </AuthContext.Provider>
        )
    }

    export function useAutenticacao() {
        return useContext(AuthContext)
    }






// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [usuario, setUsuario] = useState<Usuario | null>(null); 
//   const [token, setToken] = useState<string | null>(null);      
//   const [loading, setLoading] = useState(true);                 

   
//   useEffect(() => {
     
//     AsyncStorage.getItem(TOKEN_KEY)
//       .then((tokenSalvo) => {
//         if (tokenSalvo) {
//           setToken(tokenSalvo);
//           setUsuario(decodificarToken(tokenSalvo));  
//         }
//       })
//       .finally(() => setLoading(false)); 
//   }, []);

//   // Função para fazer Login
//   async function login(dados: Login) {
//     // Envia e-mail e senha para a API
//     const resposta = await autenticacaoService.login(dados);

//     if (resposta.token) {
//       setToken(resposta.token);                        
//       setUsuario(decodificarToken(resposta.token));    
//     }
//   }

//   async function logout() {
//     await AsyncStorage.removeItem(TOKEN_KEY); 
//     setToken(null);                           
//     setUsuario(null);                         
//     router.replace("/login");                 
//   }

//   return (
//     <AuthContext.Provider value={{ usuario, token, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export function useAuth() {
  return useContext(AuthContext);
}
