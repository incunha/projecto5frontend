import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Sidebar from '../components/sideBar/sideBar';
import Column from '../elements/column/column';
import UserCard from '../elements/userCard/userCard';
import useUserStore from '../../userStore'
import Header from '../components/header/header';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from 'react-responsive';

function Users() {
  const { fetchActiveUsers, token, activeUsers } = useUserStore();
  const { t } = useTranslation();
  const [ searchParams ] = useSearchParams();
  const searchName = searchParams.get('name')
  const filteredUsers = searchName ? activeUsers.filter(user => user.name.includes(searchName)) : activeUsers;
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });

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
      <div style={{ display: 'flex' }}>
        <Sidebar />
        {isMobile ? (
          <Carousel showThumbs={false} emulateTouch>
            {userColumns.map(({ role, title }) => {
              const usersByRole = filteredUsers.filter(user => user.role === role);
              return (
                <div key={title} className="column-carousel" style={{ minWidth: '100%', padding: '0 10px' }}>
                  <Column
                    title={title}
                    items={usersByRole}
                    CardComponent={UserCard}
                    itemPropName="item"
                    type="user"
                  />
                </div>
              );
            })}
          </Carousel>
        ) : (
          <div className="row-carousel" style={{ marginLeft: '9%' }}>
            {userColumns.map(({ role, title }) => {
              const usersByRole = filteredUsers.filter(user => user.role === role);
              return (
                <div key={title} style={{ flex: '1 0 auto', minWidth: isMobile ? '100%' : '300px', margin: '0 10px' }}>
                  <Column
                    title={title}
                    items={usersByRole}
                    CardComponent={UserCard}
                    itemPropName="item"
                    type="user"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;