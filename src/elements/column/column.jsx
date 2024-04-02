import React, { useEffect, useState } from 'react';
import './column.css';
import UserCard from '../userCard/userCard';
import TaskCard from '../taskCard/taskCard';
import { useUserStore } from '../../../userStore'; 
import  useTasksStore  from '../../../taskStore'; 

function Column({ title, items, CardComponent, onCardClick }) {
  const { updateStatus, fetchActiveTasks } = useTasksStore(); // Obtém as funções de atualização de status e busca de tarefas ativas do hook de armazenamento de tarefas

  // Mapeia os títulos de status para os valores numéricos correspondentes
  const statusMapping = {
    "To Do": 10,
    "Doing": 20,
    "Done": 30
  };

  return (
    <div className="column"> {/* Define a estrutura da coluna */}
      <h2 className="column-title">{title}</h2> {/* Renderiza o título da coluna */}
      <div className="column-content"
           onDragOver={(event) => event.preventDefault()} // Permite a soltura de itens na coluna
           onDrop={async (event) => { // Manipulador de eventos para o evento de soltura de arrastar e soltar
             const taskId = event.dataTransfer.getData('text/plain'); // Obtém o ID da tarefa sendo arrastada
             const status = statusMapping[title]; // Obtém o status correspondente ao título da coluna
             await updateStatus(taskId, status); // Atualiza o status da tarefa arrastada
             fetchActiveTasks(); // Busca as tarefas ativas atualizadas
           }}
      >
      {items.map(item => { // Mapeia os itens da coluna para os cartões correspondentes
        const props = { // Define as propriedades comuns para os cartões
          key: item.id || item.username, // Define a chave única para cada cartão
          onCardClick: () => onCardClick(item), // Define a função de clique para o cartão
          draggable: !item.deleted, // Define se o cartão pode ser arrastado com base no estado de exclusão do item
          active: item.active, // Define o estado ativo do item
        };

        // Define as propriedades específicas para os cartões de users ou tarefa
        if (CardComponent === UserCard) {
          props.user = item; // Passa o item como propriedade para o componente de cartão de user
        } else if (CardComponent === TaskCard) {
          props.task = item; // Passa o item como propriedade para o componente de cartão de tarefa
        }

        return <CardComponent {...props} />; // Renderiza o componente de cartão com as propriedades definidas
      })}
      </div>
    </div>
  );
}

export default Column;