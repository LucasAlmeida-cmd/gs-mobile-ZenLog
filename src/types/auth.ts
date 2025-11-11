// Criação do Arquivo auth.ts
// O arquivo auth.ts define os tipos utilizados para autenticação e autorização no sistema. Ele organiza os diferentes perfis de usuário, os dados necessários para login e registro, e a estrutura das respostas da API de autenticação.
// Código Criado:
/**
 * Tipos relacionados à autenticação e autorização
 */

/**
 * Perfis de usuário disponíveis no sistema
 */
export type UserRole = 'admin' | 'usuario';

/**
 * Interface base do usuário
 */
export interface BaseUser {
  id?: string | null;
  name?: string | null;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}


/**
 * Interface do usuário autenticado
 */
export type User = BaseUser;



/**
 * Dados necessários para login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  nomeUser: string;
  email: string;
  cpfUser: string;
  dataAniversario: string;
  password: string;
}

/**
 * Dados necessários para registro
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}


/**
 * Resposta da API de autenticação
 */
export interface AuthResponse {
  user: BaseUser;
  token: string;
}

/**
 * Contexto de autenticação
 */
export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;@rneui
} 
