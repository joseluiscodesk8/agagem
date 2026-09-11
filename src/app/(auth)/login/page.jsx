"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/Logo";
import styles from "./login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedInUser } = useCart();

  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("session");
      if (storedSession) {
        const session = JSON.parse(storedSession);
        setUsername(session.username);
        setIsLoggedIn(true);
        setLoggedInUser(session);
      }
    } catch {
      setIsLoggedIn(false);
    }
  }, [setLoggedInUser]);

  const handleLogin = () => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const session = { username: data.username, role: data.role };
          localStorage.setItem("session", JSON.stringify(session));
          setLoggedInUser(session);
          setUsername(session.username);
          setIsLoggedIn(true);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        await fetch("/api/v1/auth/logout", { method: "POST" });
      } catch {
        // la cookie se limpia también en el navegador al recargar
      }
      localStorage.removeItem("session");
      setUsername("");
      setIsLoggedIn(false);
      setLoggedInUser(null);
      setIsLoading(false);
    }, 2000);
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <Logo />
      <motion.section
        className={styles.container}
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
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
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
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
            </section>
            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </>
        )}
        <div>
          <Link href="/">Home</Link>
          <Link href="/register">Registarse</Link>
        </div>
      </motion.section>
    </>
  );
};

export default Login;