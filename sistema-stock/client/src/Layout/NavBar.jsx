import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../pages/Login';

// eslint-disable-next-line react/prop-types
export default function NavInicio({ isLoggedIn }) {
  // const rutaServidor = ''; //*Pruebas
  const rutaServidor = '/sistema-stock/'; //* Produccion
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href={rutaServidor + '/home'}>
          Sistema de Inventario
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* {isLoggedIn ? ( */}
            <>
              <Nav.Link href={rutaServidor + '/panel'}>Tabla</Nav.Link>
              <Nav.Link href={rutaServidor + '/form'}>Formulario</Nav.Link>
              <Nav.Link href="/Logout">Cerrar sesión</Nav.Link>
            </>
            {/* ) : ( */}
            <Nav.Link href={rutaServidor + '/Login'}>Iniciar sesión</Nav.Link>
            {/* )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
