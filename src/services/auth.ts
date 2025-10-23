import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api'; 

import { jwtDecode } from 'jwt-decode'; 
// 3. Importe seus tipos
import { User, LoginCredentials, RegisterDataPatio, RegisterData } from '../types/auth';

const STORAGE_KEYS = {
  USER: '@GS:user',
  TOKEN: '@GS:token',
  PATIOS: '@GS:patios',
};

interface LoginResponse {
  token: string;
}

interface SignInResponse {
  user: User;
  token: string;
}

// --- FUNÇÃO DE LOGIN ---
const signIn = async (credentials: LoginCredentials): Promise<SignInResponse> => {
  try {
    // 1. Chame o endpoint /api/login
    // ATENÇÃO: Mapeando 'password' (front) para 'senha' (back)
    const response = await api.post<LoginResponse>('/api/login', {
      email: credentials.email,
      senha: credentials.password, 
    });

    const { token } = response.data;

    // 2. Configure o token no header do Axios para todas as futuras requisições!
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 3. Decode o token para extrair o e-mail (o 'subject')
    // O 'sub' (subject) é o e-mail do usuário que você definiu no Spring
    const decodedToken: { sub: string, roles?: string[] } = jwtDecode(token);

    // 4. Crie o objeto User que seu AuthContext espera
    // (Isso é um paliativo. O ideal seria sua API /login já
    // retornar o objeto User ou você ter um endpoint /api/me)
    const user: User = {
      email: decodedToken.sub,
      // Tente extrair papéis (roles) se você os colocou no token
      roles: decodedToken.roles || ['USER'], 
      // Preencha outros campos obrigatórios do seu tipo 'User'
      // ex: id: '', name: '' 
    };

    // 5. Retorne o que o AuthContext espera
    return { user, token };

  } catch (error) {
    console.error('Erro no authService.signIn:', error);
    // Limpa o header em caso de falha
    api.defaults.headers.common['Authorization'] = undefined;
    throw new Error('Email ou senha inválidos');
  }
};

// --- FUNÇÃO DE LOGOUT ---
const signOut = async () => {
  // Limpa o header do Axios
  api.defaults.headers.common['Authorization'] = undefined;
  // O AuthContext já está limpando o AsyncStorage
};

// --- FUNÇÃO PARA CARREGAR USUÁRIO ---
const getStoredUser = async (): Promise<User | null> => {
  // Pega o token salvo
  const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  
  if (token) {
    // ✨ IMPORTANTE: Reconfigure o header do Axios ao abrir o app
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    return null; // Se não tem token, não tem usuário
  }
  
  // Pega os dados do usuário
  const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
  if (!userJson) return null;

  return JSON.parse(userJson) as User;
};

// --- DEMAIS FUNÇÕES ---

const registerPatio = async (data: RegisterDataPatio) => {
  // Você precisará de um endpoint no seu backend para isso
  // Ex: await api.post('/api/v1/patios', data);
  console.log('Registrando pátio:', data);
  // Simulação
  return Promise.resolve();
};

const loadRegisteredUsers = async () => {
  // Simulação
  return Promise.resolve();
};

// --- EXPORTE O SERVIÇO ---
export const authService = {
  signIn,
  signOut,
  getStoredUser,
  registerPatio,
  loadRegisteredUsers,
};