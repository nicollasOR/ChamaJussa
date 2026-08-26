export interface Login {
    email: string,
    senha: string
}

export interface LoginResponse{
    token: string
}


export interface Usuario {
  id?: string;
  nome: string;
  email: string;
}

// 2. Mapeamento das Claims exatas que a sua API envia no Token JWT
export interface UsuarioPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
  exp?: number;
  iss?: string;
  aud?: string;
}

// 3. Contrato do AuthContext
export interface AuthContextData {
  usuario: Usuario | null; // O usuário logado ou null se estiver deslogado
  token: string | null;    // O token JWT ou null
  loading: boolean;        // Se ainda está carregando o token do armazenamento
  login: (dados: Login) => Promise<void>; // Função para logar
  logout: () => Promise<void>;            // Função para deslogar
}