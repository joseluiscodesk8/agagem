import React, { useState } from "react";
import styles from "../../styles/index.module.scss";

const FormularioCliente = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, telefono });
  };

  return (
    <>
      <section className={styles.formulario}>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            required
          />
          <label>Teléfono:</label>
          <input
            type="tel"
            value={telefono}
            onChange={handleTelefonoChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </>
  );
};

export default FormularioCliente;
