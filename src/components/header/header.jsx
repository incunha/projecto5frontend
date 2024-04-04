import React, {useState, useEffect} from 'react';
import  useUserStore from '../../../userStore';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import './header.css';

function Header() {
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Atualiza a cada segundo

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Navbar className="header" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <div className="dateHeader">
          {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">{user?.firstName}</Nav.Link>
            <Image src={user?.userPhoto} roundedCircle />
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;