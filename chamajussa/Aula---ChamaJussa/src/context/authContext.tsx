
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Usuario } from '../@types/usuario'
import { jwtDecode } from 'jwt-decode'
import { autenticacaoService } from '../services/autenticacaoService'

// console.log()
type usuarioJwt = Omit<Usuario, 'usuarioID' | 'nif'> & {
    exp: number
}

interface authContextData {
        user: string | null,
        loading: boolean,
        dataExpirada: boolean,
        login: (token: string) => Promise<void>,
        logout: () => Promise<void>
}

interface authProvider {
    children: ReactNode
}

// const AuthContext = createContext<authContextData>({} as authContextData)

// export const authProvider : React.FC<authProvider> = ({ children }) => {

//     const[usuario, setUsuario] = useState<usuarioJwt>()
//     const[loading, setLoading] = useState<boolean>(true)


//     const parseToken = async ()



    
    

//   return (
    
//   )
// }

// export const authAuth = () => useContext(authProvider)