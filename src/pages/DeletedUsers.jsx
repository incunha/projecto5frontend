import React, {useEffect} from 'react';
import { Row } from 'react-bootstrap';
import Sidebar from '../components/sideBar/sideBar';
import Column from '../elements/column/column';
import UserCard from '../elements/userCard/userCard';
import useUserStore from '../../userStore'

function Users() {
  const { fetchInactiveUsers, token, inactiveUsers } = useUserStore();

  useEffect(() => {
    fetchInactiveUsers(token);
  }, [fetchInactiveUsers, token]);

  const userColumns = [
    { role: 'developer', title: 'Developer' },
    { role: 'ScrumMaster', title: 'Scrum Master' },
    { role: 'Owner', title: 'Product Owner' },
  ];

  return (
    <div>
      <Sidebar />
      <Row>
        {userColumns.map(({ role, title }) => {
          // Filtrar os users ativos por role
          const usersByRole = inactiveUsers.filter(user => user.role === role);
  
          return (
            <Column
              key={title}
              title={title}
              items={usersByRole}
              CardComponent={UserCard}
              itemPropName="item"
              type="user"
            />
          );
        })}
      </Row>
    </div>
  );
}

export default Users;