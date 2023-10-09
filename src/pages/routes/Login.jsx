import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../Context/Cartcontext";
import axios from "axios";
import { motion } from 'framer-motion';
import styles from "../../styles/index.module.scss";
import Logo from "../components/Logo";


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
      setLoggedInUser(storedUsername); 
    }
  }, [setLoggedInUser]);

  const handleLogin = () => {
    setIsLoading(true);
    // const isAuthenticated = username != "" && password !== "";
    
    

    setTimeout(async () => {
      // if (isAuthenticated) {
      //   localStorage.setItem("username", username);
      //   setLoggedInUser(username);
      //   setIsLoggedIn(true);
      // } else {
      //   alert('debes llenar los campos');
      // }
      // setIsLoading(false);
      try {
        const response = await fetch("http://localhost:3000/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Inicio de sesión exitoso
          alert(data.message);
          localStorage.setItem("username", username);
          setLoggedInUser(username);
        } else {
          // Inicio de sesión fallido
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        // Manejar errores de red u otros errores aquí
      } finally {
        setIsLoading(false);
      }
    }
    );
  };

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      localStorage.removeItem("username");
      setUsername("");
      setIsLoggedIn(false);
      setLoggedInUser(null);
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };



  return (
    <>
      <Logo />
      <motion.section 
      className={styles.sesionContainer}
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      transition={{ duration: 0.5 }}
      >
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
          <Link href="/routes/Register">Registarse</Link>
        </div>
      </motion.section>
    </>
  );
};

export default Login;
