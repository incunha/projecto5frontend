import { useState, useEffect } from 'react';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';
import { useLocation, useSearchParams } from 'react-router-dom';

/*Quando uma nova mensagem é recebida do servidor, verifica se deve adicionar, remover ou atualizar uma 
tarefa com base na mensagem recebida e no estado atual da aplicação.
Gerencia a comunicação entre o cliente e o servidor em relação às operações relacionadas às tarefas, 
como adição, remoção e atualização. Monitora o estado das tarefas e das tarefas excluídas, 
bem como a localização atual da aplicação, para determinar como lidar com as mensagens recebidas do servidor.
Por exemplo, quando uma mensagem indica que uma tarefa foi bloqueada, verifica se a tarefa deve ser removida 
ou adicionada à lista de tarefas excluídas, dependendo da localização atual da aplicação e das informações contidas na mensagem.
Da mesma forma, quando uma tarefa é restaurada, decide se ela deve ser removida da lista de tarefas excluídas ou adicionada de volta à lista de tarefas ativas.
Fornece uma função sendMessage que permite ao cliente enviar mensagens para o servidor, como solicitações para bloquear ou restaurar uma tarefa. */

export function useTasksWebSocket() {
  const [websocket, setWebsocket] = useState(null);
  const token = useUserStore(state => state.token);
  const { removeTask, addTask, updateStoreTask, updateStatusTask, removeDeletedTask, addDeletedTask } = useTaskStore();
  const location = useLocation();
  const tasks = useTaskStore(state => state.tasks);
  const deletedTasks = useTaskStore(state => state.deletedTasks);

  
 

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/task/${token}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      console.log ('Ready state:', socket.readyState);
    };

    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      const queryParams = new URLSearchParams(location.search);
      const username = queryParams.get('username');
      const category = queryParams.get('category');
      
      const shouldRemoveTask = 
      (username == null && category == null && (message.action === 'block' || message.action === 'status' && !message.task.active)) ||
      (username != null && category == null && message.action === 'block' && username === message.task.username) ||
      (username == null && category != null && message.action === 'block' && category === message.task.category) ||
      (username != null && category != null && message.action === 'block' && username === message.task.username && category === message.task.category);
    
    const shouldAddTask = 
      (username != null && username === message.task.username) ||
      (category != null && category === message.task.category) ||
      (username == null && category == null )||
      (username == null && category == null  && (message.task.active === true || message.action === 'status' && message.task.active));
      
      const shouldRemoveDeletedTask = 
        (username == null && category == null && location.pathname === '/deleted-tasks' && (message.action === 'restore' || message.action === 'delete')) ||
        (username != null && category == null && location.pathname === '/deleted-tasks' && (message.action === 'restore' || message.action === 'delete') && username === message.task.username) ||
        (username == null && category != null && location.pathname === '/deleted-tasks' && (message.action === 'restore' || message.action === 'delete') && category === message.task.category) ||
        (username != null && category != null && location.pathname === '/deleted-tasks' && (message.action === 'restore' || message.action === 'delete') && username === message.task.username && category === message.task.category);

      const shouldAddDeletedTask = 
        (username == null && category == null && location.pathname === '/deleted-tasks');
      
        if (shouldRemoveTask) {
          removeTask(message.task.id);
          if (message.action === 'block') {
            addDeletedTask(message.task);
          }
        } else if (shouldAddTask) {
          const taskExists = tasks.some(task => task.id === message.task.id);
          if (!taskExists) {
            addTask(message.task);
          } else {
            updateStoreTask(message.task);
          }
        }
        
        if (shouldRemoveDeletedTask) {
          removeDeletedTask(message.task.id);
          if (message.action === 'restore') {
            const taskExists = tasks.some(task => task.id === message.task.id);
            if (!taskExists) {
              addTask(message.task);
            } else {
              updateStoreTask(message.task);
            }
          }
        } else if (shouldAddDeletedTask) {
          const taskExists = deletedTasks.some(task => task.id === message.task.id);
          if (!taskExists) {
            addDeletedTask(message.task);
          } else {
            updateStatusTask(message.task);
          }
        }
      }
    

    socket.onerror = function(event) {
      console.error('WebSocket error observed:', event);
    };
    

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [token, addTask, removeTask, removeDeletedTask, addDeletedTask, updateStoreTask, updateStatusTask, location, tasks, deletedTasks]);

  const sendMessage = (message) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    }
  };

  return sendMessage;
}