import React, { useEffect } from 'react';
import useCategoryStore from '../../../categoryStore'; // Importa o hook useCategoryStore do categoryStore
import useTasksStore from '../../../taskStore'; // Importa o hook useTasksStore do taskStore
import './categorySelect.css'; // Importa o estilo CSS para o componente

function CategorySelect() {
  const { categories, fetchCategories } = useCategoryStore(); // Obtém categorias e a função fetchCategories do useCategoryStore
  const { fetchTasksByCategory } = useTasksStore(); // Obtém a função fetchTasksByCategory do useTasksStore
  const fetchActiveTasks = useTasksStore(state => state.fetchActiveTasks); // Obtém a função fetchActiveTasks do useTasksStore

  // Efeito para buscar categorias quando o componente é montado
  useEffect(() => {
    fetchCategories(); // Chama a função fetchCategories para buscar categorias
  }, [fetchCategories]); // Executa o efeito quando fetchCategories muda

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (event) => {
    // Verifica se o valor selecionado é vazio (indicando "Todas as categorias")
    if (event.target.value === "") {
      fetchActiveTasks(); // Se sim, busca todas as tarefas
    } else {
      fetchTasksByCategory(event.target.value); // Senão, busca tarefas pela categoria selecionada
    }
  };

  // Renderiza o componente de seleção de categoria
  return (
    <select className='mySelect' onChange={handleCategoryChange}>
      <option value="">All Categories</option> {/* Opção para mostrar todas as categorias */}
      {/* Mapeia as categorias disponíveis para criar as opções do seletor */}
      {categories.map(category => (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
export default CategorySelect;