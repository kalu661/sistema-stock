import { useState } from 'react';
import axios from 'axios';
import { Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      username: user,
      password: password,
    };

    const InicioSesionError = () => {
      swal({
        title: 'Inicio de Sesión Fallida',
        text: 'Ingrese los datos correctamente',
        icon: 'error',
        timer: '3000',
      });
    };
    const InicioSesionExitosa = () => {
      swal({
        title: 'Inicio de Sesión Exitosa',
        text: 'Bienvenido',
        icon: 'success',
        timer: '3000',
      });
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        data
      );
      if (response.data) {
        navigate('/Home');
        setIsLoggedIn(true);
        InicioSesionExitosa();
      } else {
        setMessage('Error al iniciar sesión. Por favor, intenta más tarde.');
      }
    } catch (error) {
      InicioSesionError();
      console.error('Error al realizar la solicitud:', error);
      setMessage('Credenciales incorrectas. Inténtalo nuevamente.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Inicio de sesión</h1>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          id="form1"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <input
          id="form2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <Button type="submit" value="Iniciar sesión">
          Iniciar sesión
        </Button>
      </form>
      <Navbar isLoggedIn={isLoggedIn} />
    </div>
  );
}
