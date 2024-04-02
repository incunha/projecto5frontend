import { create } from 'zustand';

// Cria um hook de estado para autenticação utilizando o Zustand
const useAuthStore = create(set => ({
  // Estado inicial: token de autenticação
  token: null,

  // Função para definir o token de autenticação
  setToken: (token) => set({ token }),
}));

// Exporta o hook de estado de autenticação para uso em outros componentes
export default useAuthStore;
