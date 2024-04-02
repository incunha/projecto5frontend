import React, { useEffect } from 'react';
import Column from './column/column.jsx';
import { useUserStore } from '../../userStore.js';
import UserCard from './userCard/userCard.jsx';

function DeletedUsers() {
  const userColumns = ['Developer', 'Scrum Master', 'Product Owner'];
  const roleMapping = {
    'Developer': 'developer',
    'Scrum Master': 'ScrumMaster',
    'Product Owner': 'Owner'
  };

  const {users, fetchInactiveUsers} = useUserStore();

  useEffect(() => {
    fetchInactiveUsers();
  }, [fetchInactiveUsers]);

  return (
    <div className="columns">
      {userColumns.map(title => (
        <Column
          key={title}
          title={title}
          items={users.filter(user => user.role === roleMapping[title] && !user.active)}
          CardComponent={UserCard}
        />
      ))}
    </div>
  );
}

export default DeletedUsers;