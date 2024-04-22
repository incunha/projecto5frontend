import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Sidebar from '../components/sideBar/sideBar';
import Column from '../elements/column/column';
import UserCard from '../elements/userCard/userCard';
import useUserStore from '../../userStore'
import Header from '../components/header/header';
import { useTranslation } from 'react-i18next';

function Users() {
  const { fetchActiveUsers, token, activeUsers } = useUserStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchActiveUsers(token);
  }, []);

  const userColumns = [
    { role: 'developer', title: t('Developer') },
    { role: 'ScrumMaster', title: t('Scrum Master') },
    { role: 'Owner', title: t('Product Owner') },
  ];

  return (
    <div>
      <Header />
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <Row>
            {userColumns.map(({ role, title }) => {
              const usersByRole = activeUsers.filter(user => user.role === role);
              return (
                <Col md={4} key={title}>
                  <Column
                    title={title}
                    items={usersByRole}
                    CardComponent={UserCard}
                    itemPropName="item"
                    type="user"
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Users;