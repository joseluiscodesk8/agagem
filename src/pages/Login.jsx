import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '../Context/Cartcontext';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setLoggedInUser } = useCart();

  useEffect(() => {
    // Comprueba si hay datos de inicio de sesión almacenados en localStorage al cargar el componente
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Simula la autenticación (cambia esto según tus necesidades)
    const isAuthenticated = true; // Cambia esto según tus necesidades

    if (isAuthenticated) {
      // Almacena el nombre de usuario en localStorage para persistencia
      localStorage.setItem('username', username);
      // onLogin(username);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    // Limpia los datos de inicio de sesión al cerrar sesión
    localStorage.removeItem('username');
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <>
      <div>
        {isLoggedIn ? (
          <>
            <h2>Hola, {username}</h2>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <h2>Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Iniciar Sesión</button>
          </>
        )}
      </div>
      <Link href="/">Home</Link>
    </>
  );
};

export default Login;
