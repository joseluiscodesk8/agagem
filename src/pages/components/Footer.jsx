import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/index.module.scss";

const Footer = () => {

    const [showFirstContent, setShowFirstContent] = useState(true);

    const toggleContent = () => {
      setShowFirstContent(!showFirstContent);
    };
    
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Breve descripción de tu empresa y servicios."
        />
      </Head>
      <footer className={styles.agagemFooter}>
        <section className={styles.agagemContainer}>

        <motion.section
          initial={{ opacity: 1, x: 0 }} // Estado inicial de la primera sección
          animate={{
            opacity: showFirstContent ? 1 : 0, // Si showFirstContent es true, muestra la primera sección
            x: showFirstContent ? 0 : 100, // Si showFirstContent es true, no desplazar en el eje X
          }}
          transition={{ duration: 0.5 }} // Duración de la animación
        >
          <div className={styles.footerContent}>
            <h3>Agagem Arte y Accesorios</h3>
            <p><b>Ubicación:</b> Medellin Antioquia</p>
            <p><b>Correo Electrónico: </b>agagem2023@gmail.com</p>
            <p><b>Número de Teléfono:</b> 3232882017</p>
            <p><b>Síguenos en Instagram:</b> <a href="">@agegem_</a></p>
          </div>
          <div className={styles.footerImage}>
            <Image src="/agagem2.jpg" width={160} height={100} alt="loco" />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 100, }} // Estado inicial de la segunda sección
          animate={{
            opacity: showFirstContent ? 0 : 1, // Si showFirstContent es false, muestra la segunda sección
            x: showFirstContent ? 100 : 0, // Si showFirstContent es false, desplaza 100 unidades en el eje X
          }}
          transition={{ duration: 0.5 }} // Duración de la animación
        >
          <div className={styles.footerContent}>
            <h3>Agagem Arte y Accesorios</h3>
            <p><b>Ubicación:</b> Medellin Antioquia</p>
            <p><b>Correo Electrónico: </b>agagem2023@gmail.com</p>
            <p><b>Número de Teléfono:</b> 3232882017</p>
            <p><b>Síguenos en Instagram:</b> <a href="">@agegem_</a></p>
          </div>
          <div className={styles.footerImage}>
            <Image src="/agagem2.jpg" width={160} height={100} alt="loco" />
          </div>
        </motion.section>

        <motion.button onClick={toggleContent}>
          Cambiar Sección
        </motion.button>

        </section>
      </footer>
    </>
  );
};

export default Footer;


