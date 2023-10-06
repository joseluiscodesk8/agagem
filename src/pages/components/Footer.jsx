import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/index.module.scss";

const Footer = () => {
    
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

        <section
        >
          <div className={styles.footerContent}>
            <h3>Agagem Arte y Accesorios</h3>
            <p><b>Ubicación:</b> Medellin Antioquia</p>
            <p><b>Correo Electrónico: </b>agagem2023@gmail.com</p>
            <p><b>Número de Teléfono:</b> 3232882017</p>
            <p><b>Síguenos en Instagram:</b> <a href="https://instagram.com/agagem_?igshid=MzRlODBiNWFlZA==">@agegem_</a></p>
          </div>
          <div className={styles.footerImage}>
            <Image src="/agagem3.png" width={112} height={63} alt="loco" />
          </div>
        </section>

        </section>
      </footer>
    </>
  );
};

export default Footer;


