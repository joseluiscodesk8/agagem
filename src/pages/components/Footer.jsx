import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { TfiEmail, TfiInstagram, TfiLocationPin } from 'react-icons/tfi';
import { BsPhone } from 'react-icons/bs';
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
            <p><TfiLocationPin /> Medellin Antioquia</p>
            <p><TfiEmail /> agagem2023@gmail.com</p>
            <p><BsPhone /> 3232882017</p>
            <p><TfiInstagram /> <a href="https://instagram.com/agagem_?igshid=MzRlODBiNWFlZA==">@agegem_</a></p>
          </div>
          <div className={styles.footerImage}>
            <Image src="/agagem3.png" width={112} height={63} alt="loco" />
          </div>
        </section>

        </section>

        <span>Realizado por José luís Gómez: 
        <Link href="https://webdesignerfreelancer.netlify.app/" target="blank_"> webdesigner.com</Link>
        </span>
      </footer>
    </>
  );
};

export default Footer;


