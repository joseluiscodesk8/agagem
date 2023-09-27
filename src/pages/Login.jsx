import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../Context/Cartcontext";
import styles from "../styles/index.module.scss";
import Logo from "./components/Logo";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedInUser } = useCart();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    const isAuthenticated = true;

    setTimeout(() => {
      if (isAuthenticated) {
        localStorage.setItem("username", username);
        // onLogin(username);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      localStorage.removeItem("username");
      setUsername("");
      setIsLoggedIn(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  // Manejadores de eventos para el input de contraseña
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  return (
    <>
      <Logo />
      <section className={styles.sesionContainer}>
        {isLoggedIn ? (
          <>
            <h2>Hola, {username}</h2>
            <button onClick={handleLogout} disabled={isLoading}>
              {isLoading ? "Cargando..." : "Cerrar Sesión"}
            </button>
          </>
        ) : (
          <>
            <h2>Iniciar Sesión</h2>
            <section
              className={`${styles.inputContainer} ${
                isInputFocused || username ? styles.labelUp : ""
              }`}
            >
              <label
                className={isInputFocused || username ? styles.labelUp : ""}
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </section>
            <section
              className={`${styles.inputContainer} ${
                isPasswordFocused || password ? styles.labelUp : ""
              }`}
            >
              <label
                className={isPasswordFocused || password ? styles.labelUp : ""}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
            </section>
            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </>
        )}
        <div>
          <Link href="/">Home</Link>
        </div>
      </section>
    </>
  );
};

export default Login;
