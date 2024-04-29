import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  fetchCategories, 
  createCategory, 
  updateCategory, 
  removeCategory
} from './categoryActions';

/*armazena o estado das categorias, garantindo que o estado 
persista mesmo após a atualização da página. Exporta as funções necessárias 
para manipular as categorias, permitindo que outros componentes usem essas funções*/

const useCategoryStore = create(persist(
  (set) => ({
    categories: [],

    fetchCategories: (token) => fetchCategories(set, token),
    createCategory: (category, token) => createCategory(set, category, token),
    updateCategory: (category, token) => updateCategory(set, category, token),
    removeCategory: (name, token) => removeCategory(set, name, token),
    clearStore: () => set({ categories: [] }),
  }),
  {
    name:'categoryStore',
    getStorage: () => sessionStorage,
  }
));

export default useCategoryStore;