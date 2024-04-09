import React, {useEffect} from 'react';
import { Row } from 'react-bootstrap';
import Sidebar from '../components/sideBar/sideBar';
import Column from '../elements/column/column';
import UserCard from '../elements/userCard/userCard'; 
import useUserStore from '../../userStore'
function Users() {
  const { users, fetchActiveUsers } = useUserStore();

  useEffect(() => {
    fetchActiveUsers();
  }, [fetchActiveUsers]);

  const userColumns = [
    { role: 'developer', title: 'Developer' },
    { role: 'ScrumMaster', title: 'Scrum Master' },
    { role: 'Owner', title: 'Product Owner' },
  ];

  return (
    <div>
      <Sidebar />
      <Row>
        {userColumns.map(({ role, title }) => (
          <Column
            key={title}
            title={title}
            items={users ? users.filter(user => user.role === role) : []}
            CardComponent={UserCard}
          />
        ))}
      </Row>
    </div>
  );
}

export default Users;