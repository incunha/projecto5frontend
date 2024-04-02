import React, {useEffect} from 'react';
import Column from './column/column.jsx';
import useTasksStore from '../../taskStore.js';
import TaskCard from './taskCard/taskCard.jsx';

function Tasks() {
  const taskColumns = ['To Do', 'Doing', 'Done'];
  const { activeTasks, fetchActiveTasks } = useTasksStore();

  const statusValues = {
    'To Do': 10,
    'Doing': 20,
    'Done': 30,
  };

  useEffect(() => {
    fetchActiveTasks();
  }, [fetchActiveTasks]);


  return (
    <div className="columns">
      {taskColumns.map(title => (
       <Column
       key={title}
       title={title}
       items={activeTasks.filter(task => task.status === statusValues[title])}
       CardComponent={TaskCard}
     />
      ))}
    </div>
  );
}

export default Tasks;