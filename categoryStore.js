import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  fetchCategories, 
  createCategory, 
  updateCategory, 
  removeCategory
} from './categoryActions';

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