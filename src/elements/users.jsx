import React, { useEffect } from 'react';
import Column from './column/column.jsx';
import { useUserStore } from '../../userStore.js';
import UserCard from './userCard/userCard.jsx';

function Users() {
  const userColumns = ['Developer', 'Scrum Master', 'Product Owner'];
  const roleMapping = {
    'Developer': 'developer',
    'Scrum Master': 'ScrumMaster',
    'Product Owner': 'Owner'
  };

  const {users, fetchActiveUsers, selectUser: selectUserInList} = useUserStore();

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  const selectUser = (user) => {
    const token = sessionStorage.getItem('token');
    selectUserInList(user.username, token);
  }

  return (
    <div className="columns">
      {userColumns.map(title => (
        <Column
          key={title}
          title={title}
          items={users ? users.filter(user => user.role === roleMapping[title] && user.username !== 'admin' && user.username !== 'deleted') : []}
          CardComponent={UserCard}
          onCardClick={selectUser}
        />
      ))}
    </div>
  );
}

export default Users;