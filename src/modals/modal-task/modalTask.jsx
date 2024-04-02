import React, { useState, useEffect } from 'react';
import './modalTask.css'; // Importação do arquivo CSS para estilos específicos do modal
import useTasksStore from '../../../taskStore'; // Importação do hook personalizado para gerenciamento de estado das tarefas
import useCategoryStore from '../../../categoryStore'; // Importação do hook personalizado para gerenciamento de estado das categorias
import { useUserStore } from '../../../userStore'; // Importação do hook personalizado para gerenciamento de estado do user

function TaskModal({ task, isOpen, onClose }) { // Componente funcional para exibir e editar os detalhes de uma tarefa em um modal
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se a tarefa está sendo editada
  const [editedTask, setEditedTask] = useState({ ...task }); // Estado para armazenar os detalhes da tarefa sendo editada
  const {categories, fetchCategories} = useCategoryStore(); // Extração das categorias e da função para buscar categorias do hook useCategoryStore
  const loggedUser = useUserStore(state => state.loggedUser); // Extração do user logado do estado global usando o hook useUserStore
  const [taskCreator, setTaskCreator] = useState(null); // Estado para armazenar o criador da tarefa
  const [showWarning, setShowWarning] = useState(false); // Estado para controlar a exibição do aviso

  useEffect(() => { // Efeito para ir buscar o criador da tarefa quando o modal é aberto
    const fetchTaskCreator = async () => { // Função assíncrona para ir buscar o criador da tarefa
      const taskCreator = await useTasksStore.getState().fetchTaskCreator(task.id); // Chamada ao método fetchTaskCreator do estado global das tarefas para obter o criador da tarefa
      setTaskCreator(taskCreator); // Atualização do estado com o criador da tarefa obtido
    };

    if (isOpen) { // Condição para executar a busca pelo criador da tarefa apenas quando o modal está aberto
      fetchTaskCreator(); // Chamada à função para buscar o criador da tarefa
    }
  }, [isOpen]); // Dependência do efeito: isOpen, para garantir que o efeito seja reexecutado quando o modal é aberto ou fechado

  useEffect(() => { // Efeito para buscar as categorias ao carregar o componente
    fetchCategories(); // Chamada à função para buscar as categorias
  }, []); // Array de dependências vazio para garantir que o efeito seja executado apenas uma vez, ao montar o componente

  const handleEditClick = () => { // Função para lidar com o clique no botão de edição
    setIsEditing(true); // Atualiza o estado para indicar que a tarefa está sendo editada
  };

  const handleSaveClick = async () => { // Função para lidar com o clique no botão de salvar
    // Verifica se algum dos campos obrigatórios está vazio
    if (!editedTask.title || !editedTask.description || !editedTask.category || !editedTask.startDate || !editedTask.priority || !editedTask.status) {
      setShowWarning(true); // Mostra o aviso
      return; // Interrompe a execução da função
    }
  
    setShowWarning(false); // Esconde o aviso
  
    if (editedTask.endDate === '') { // Verifica se a data de término da tarefa está vazia
      editedTask.endDate = '2199-12-31'; // Define a data de término como uma data futura caso esteja vazia
    }
    await useTasksStore.getState().updateTask(editedTask); // Chamada ao método updateTask do estado global das tarefas para atualizar a tarefa
    setIsEditing(false); // Atualiza o estado para indicar que a edição da tarefa foi finalizada
    onClose(); // Chama a função de callback para fechar o modal
  };

  const handleCancelClick = () => { // Função para lidar com o clique no botão de cancelar
    setIsEditing(false); // Atualiza o estado para indicar que a edição da tarefa foi cancelada
    setEditedTask({ ...task }); // Restaura os detalhes da tarefa para os valores originais
    setShowWarning(false); // Esconde o aviso
  };

  const handleChange = (event) => { // Função para lidar com a alteração nos campos de edição da tarefa
    const { name, value } = event.target; // Extrai o nome e o valor do campo alterado
    setEditedTask({ ...editedTask, [name]: value }); // Atualiza os detalhes da tarefa em edição com o novo valor
  };

  function mapPriority(priority) { // Função para mapear o valor numérico da prioridade para uma descrição textual
    switch(priority) { // Switch para verificar o valor da prioridade
      case 100:
        return 'Low'; // Retorna 'Low' para prioridade 100
      case 200:
        return 'Medium'; // Retorna 'Medium' para prioridade 200
      case 300:
        return 'High'; // Retorna 'High' para prioridade 300
      default:
        return ''; // Retorna uma string vazia para outros valores de prioridade
    }
  }
  
  function mapStatus(status) { // Função para mapear o valor numérico do status para uma descrição textual
    switch(status) { // Switch para verificar o valor do status
      case 10:
        return 'To Do'; // Retorna 'To Do' para status 10
      case 20:
        return 'Doing'; // Retorna 'Doing' para status 20
      case 30:
        return 'Done'; // Retorna 'Done' para status 30
      default:
        return ''; // Retorna uma string vazia para outros valores de status
    }
  }

  return (
    isOpen && (// Renderiza o modal apenas se estiver aberto
      <>
        <div className="modal-overlay" onClick={onClose} /> 
        <div className="modal">
          <h2>Task Details</h2>
          {isEditing ? ( // Verifica se o modal está no modo de edição
            <>
              <div className='taskDetailsEdit'>
              <label className = "taskLabel">Title</label>
              <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
                </div>
                <div className='taskDetailsEdit'>
              <label className = "taskLabel">Description</label>
              <input type="text" name="description" value={editedTask.description} onChange={handleChange} />
                </div>
                <div className='taskDetailsEdit'>
              <label className = "taskLabel">Category</label>
              <select className = "taskFilters" name="category" value={editedTask.category} onChange={handleChange}>
            {categories.map((category) => (
             <option key={category.name} value={category.name}>{category.name}</option>
         ))}
              </select>
                </div>
                <div className='taskDetailsEdit'>
              <label className = "taskLabel">Start Date</label>
              <input type="date" name="startDate" value={editedTask.startDate} onChange={handleChange} />
                </div>
                <div className ="taskDetailsEdit">
              <label className = "taskLabel">End Date</label>
              <input type="date" name="endDate" value={editedTask.endDate === '2199-12-31' ? '' : editedTask.endDate} onChange={handleChange} />
                </div>
                <div className='taskDetailsEdit'>
              <label className = "taskLabel">Priority</label>
              <select className = "taskFilters" name="priority" value={editedTask.priority} onChange={handleChange}>
              <option value="100">Low</option>
              <option value="200">Medium</option>
              <option value="300">High</option>
              </select>
                </div>
                <div className='taskDetailsEdit'>
              <label className = "taskLabel">Status</label>
              <select className = "taskFilters" name="status" value={editedTask.status} onChange={handleChange}>
              <option value="10">To Do</option>
              <option value="20">Doing</option>
             <option value="30">Done</option>
             </select>
                </div>
                {showWarning && <p style={{ color: 'red' }}>Please fill in all fields.</p>} 
                <div className = "buttonContainerTaskModal">
              <button className = "myButton" onClick={handleSaveClick}>Save</button>
              <button className = "myButton" onClick={handleCancelClick}>Cancel</button>
                </div>
            </>
          ) : (// Caso contrário, mostra os detalhes da tarefa
            <>
            <div className='taskDetails'>
            <p><span className="taskLabel">Creator:</span> {taskCreator ? taskCreator.username : ''}</p>
            </div>
            <div className="taskDetails"> <p><span className="taskLabel">Title:</span> {task.title}</p>
             </div>
             <div className="taskDetails"> <p><span className="taskLabel">Description:</span> {task.description}</p>
                </div>
                <div className="taskDetails"> <p><span className="taskLabel">Category:</span> {task.category}</p>
                </div>
                <div className="taskDetails"> <p><span className="taskLabel">Start Date:</span> {task.startDate}</p>
                </div>
                <div className="taskDetails"> <p><span className="taskLabel">End Date:</span> {task.endDate === '2199-12-31' ? '' : task.endDate}</p>
                </div>
                <div className="taskDetails"> <p><span className="taskLabel">Priority:</span> {mapPriority(task.priority)}</p>
                </div>
                <div className="taskDetails"> <p><span className="taskLabel">Status:</span> {mapStatus(task.status)}</p>
                </div>
                <div className = "buttonContainerTaskModal">
            {taskCreator &&( loggedUser.role === 'Owner' || loggedUser.role === 'ScrumMaster' || (loggedUser.role === 'developer' && taskCreator.username === loggedUser.username)) ? <button className = "myButton" onClick={handleEditClick}>Edit</button> : null}
            <button className='myButton' onClick={onClose}>Close</button>
                </div>
            </>
          )}
        </div>
      </>
    )
  );
}

export default TaskModal;