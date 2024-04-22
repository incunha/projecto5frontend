import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2'; // Biblioteca para gráficos

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Aqui você faria a chamada à API para buscar os dados necessários
    // Por exemplo:
    // fetch('http://localhost:8080/api/dashboard-data')
    //   .then(response => response.json())
    //   .then(data => setData(data));
  }, []);

 

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total de usuários: {data.totalUsers}</p>
      <p>Usuários confirmados: {data.confirmedUsers}</p>
      <p>Usuários não confirmados: {data.unconfirmedUsers}</p>
      <p>Média de tarefas por usuário: {data.averageTasksPerUser}</p>
      <p>Tarefas em "DOING": {data.tasksDoing}</p>
      <p>Tarefas em "DONE": {data.tasksDone}</p>
      <p>Tempo médio para concluir uma tarefa: {data.averageCompletionTime}</p>

      <h2>Categorias</h2>
      <ul>
        {data.categories.map(category => (
          <li key={category.id}>{category.name}: {category.taskCount}</li>
        ))}
      </ul>

      <h2>Usuários registrados ao longo do tempo</h2>
      <Line data={data.usersOverTime} />

      <h2>Tarefas concluídas ao longo do tempo</h2>
      <Bar data={data.tasksCompletedOverTime} />
    </div>
  );
}

export default Dashboard;