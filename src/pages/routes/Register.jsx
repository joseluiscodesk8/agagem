import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../../styles/index.module.scss";
import Logo from "../components/Logo";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        username,
        email,
        phone,
        password,
      });

      setIsRegistered(true); // Simulando que el registro ha sido exitoso
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Error al registrar el usuario. Por favor, inténtalo de nuevo.");
      // Puedes mostrar un mensaje de error al usuario aquí.
    }

    setIsLoading(false);
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.section 
      className={styles.RegisterContainer}
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      transition={{ duration: 0.5 }}
      >
        {isRegistered ? (
          <section className={styles.successMessage}>
            ¡Registro exitoso! Ahora puedes iniciar sesión.
          </section>
        ) : (
          <>
            <h2>Registarse</h2>
            <form onSubmit={handleRegister}>
              <section className={styles.inputContainer}>
                <label
                  className={
                    isUsernameFocused || username ? styles.labelUp : ""
                  }
                >
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                />
              </section>
              <section className={styles.inputContainer}>
                <label
                  className={isEmailFocused || email ? styles.labelUp : ""}
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </section>
              <section className={styles.inputContainer}>
                <label
                  className={isPhoneFocused || phone ? styles.labelUp : ""}
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                />
              </section>
              <section className={styles.inputContainer}>
                <label
                  className={
                    isPasswordFocused || password ? styles.labelUp : ""
                  }
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </section>
              <section className={styles.inputContainer}>
                <label
                  className={
                    isConfirmPasswordFocused || confirmPassword
                      ? styles.labelUp
                      : ""
                  }
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
                />
              </section>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Registrar"}
              </button>
            </form>
          </>
        )}
         <div>
          <Link href="/">Home</Link>
          <Link href="/routes/Login">Login</Link>
        </div>
      </motion.section>
    </>
  );
};

export default Register;
