import Link from "next/link";
import LazyImage from "./LazyImagen";
import styles from "../../styles/index.module.scss";

const Footer = () => {
  return (
    <>
      <footer className={styles.agagemFooter}>
        <section className={styles.agagemContainer}>
          <section>
            <div className={styles.footerContent}>
              <h3>Agagem Arte y Accesorios</h3>
              <span>
              <LazyImage
                src="/icons/gps.png"
                width={20} height={20}
                alt="icon"
              /> Medellin Antioquia
              </span>
              <span>
              <LazyImage
                src="/icons/letter.png"
                width={20} height={20}
                alt="icon"
              /> agagem2023@gmail.com
              </span>
              <span>
              <LazyImage
                src="/icons/cell.png"
                width={20} height={20}
                alt="icon"
              /> 3232882017
              </span>
              <span>
              <LazyImage
                src="/icons/insta.png"
                width={20} height={20}
                alt="icon"
              />{" "}
                <a href="https://instagram.com/agagem_?igshid=MzRlODBiNWFlZA==">
                  @agegem_
                </a>
              </span>


            </div>
            <div className={styles.footerImage}>
              <LazyImage
                src="/logos/agagem3.png"
                width={112} height={63}
                alt="icon"
              />
            </div>
          </section>
        </section>

        <span className={styles.contact}>
          Realizado por José luís Gómez:
          <Link
            href="https://webdesignerfreelancer.netlify.app/"
            target="blank_"
          >
            {" "}
            webdesigner.com
          </Link>
        </span>
      </footer>
    </>
  );
};

export default Footer;
