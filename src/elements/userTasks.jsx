import React from 'react';
import Column from './column/column.jsx';
import useTasksStore from '../../taskStore.js';
import { useUserStore } from '../../userStore.js';
import TaskCard from './taskCard/taskCard.jsx';

function UserTasks() {
  const taskColumns = ['To Do', 'Doing', 'Done'];
  const { activeTasks, loggedUserTasks, fetchTasksByUser } = useTasksStore();
  const userUsername = useUserStore(state => state.userUsername);

  const statusValues = {
    'To Do': 10,
    'Doing': 20,
    'Done': 30,
  };

  const tasksToDisplay = (loggedUserTasks && loggedUserTasks.length > 0) ? loggedUserTasks : activeTasks;

  const handleButtonClick = () => {
    if (userUsername) {
      fetchTasksByUser(userUsername);
    }
  };

  return (
    <div className="columns">
      {taskColumns.map(title => (
        <Column
          key={title}
          title={title}
          items={tasksToDisplay.filter(task => task.status === statusValues[title])}
          CardComponent={TaskCard}
        />
      ))}
    </div>
  );
}

export default UserTasks;