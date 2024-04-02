import React, { useEffect } from 'react';
import {useUserStore} from '../../../userStore';
import useTasksStore from '../../../taskStore';
import '../categorySelect/categorySelect.css';

function UserSelect() {
  const { users, fetchUsers } = useUserStore();
  const { fetchTasksByUser } = useTasksStore();
  const fetchActiveTasks = useTasksStore(state => state.fetchActiveTasks);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserChange = (event) => {
    event.target.value ==="" ? fetchActiveTasks() : fetchTasksByUser(event.target.value);
  };


  return (
    <select className = 'mySelect' onChange={handleUserChange}>
      <option value="">All Users</option>
      {users.map(user => (
        <option key={user.username} value={user.username}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelect;