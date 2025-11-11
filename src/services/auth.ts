import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

import { jwtDecode } from 'jwt-decode';
// 3. Importe seus tipos
import { User, LoginCredentials, RegisterData, AuthResponse, RegisterCredentials } from '../types/auth';

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
const signIn = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/login', {
      email: credentials.email,
      senha: credentials.password,
    });

    const { user, token } = response.data;

    // Configura o header do Axios
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { user, token };

  } catch (error) {
    console.error('Erro no authService.signIn:', error);
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

// --- FUNÇÃO DE REGISTER ---
const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await api.post('/usuarios/salvar', {
      nomeUser: credentials.nomeUser,
      email: credentials.email,
      cpfUser: credentials.cpfUser,
      dataAniversario: credentials.dataAniversario,
      password: credentials.password,
    });

    return response.data; // opcional, caso queira retornar o usuário criado
  } catch (error: any) {
    console.error('Erro no authService.register:', error);
    throw new Error('Erro ao criar usuário. Verifique os dados e tente novamente.');
  }
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



const loadRegisteredUsers = async () => {
  // Simulação
  return Promise.resolve();
};

// --- EXPORTE O SERVIÇO ---
export const authService = {
  signIn,
  signOut,
  getStoredUser,
  register,
  loadRegisteredUsers,
};