import { create } from "zustand";

const useCategoryStore = create((set) => ({
  categories: [],
  isWarningModalOpen: false,

  // Função para definir se o modal de aviso está aberto ou fechado
  setWarningModalOpen: (isOpen) => set({ isWarningModalOpen: isOpen }),
  
//Função para ir buscar as categorias
  fetchCategories: async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        console.error(`Error fetching categories: ${response.statusText}`);
        return;
      }

      const categories = await response.json();
      set({ categories });
    } catch (error) {
      console.error(error);
    }
  },

  //Função para apagar uma categoria
  deleteCategory: async (categoryName) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/categories/${categoryName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: token,
          },
        }
      );

      if (response.ok) {
        await useCategoryStore.getState().fetchCategories();
      }else if(response.status === 409){
        set({ isWarningModalOpen: true, warningMessage: 'Cannot delete category that has tasks.' });
      }
      return response;
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  },

//Função para criar uma categoria
  createCategory: async (newCategoryName) => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ name: newCategoryName }),
        }
      );

      if (response.ok) {
        await useCategoryStore.getState().fetchCategories();
      }else if(response.status === 409){
        set({ isWarningModalOpen: true, warningMessage: 'Category already exists' });
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  //Função para editar uma categoria
  updateCategory: async (categoryToEdit, newCategoryName) => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/categories",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: categoryToEdit.id,
            name: newCategoryName,
          }),
        }
      );

      if (response.ok) {
        await useCategoryStore.getState().fetchCategories();
      }
      else if(response.status === 409){
        set({ isWarningModalOpen: true, warningMessage: 'Name already exists' });
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCategoryStore;
