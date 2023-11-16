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
              <p>
              <LazyImage
                src="/gps.png"
                width={20} height={20}
                alt="icon"
              /> Medellin Antioquia
              </p>
              <p>
              <LazyImage
                src="/letter.png"
                width={20} height={20}
                alt="icon"
              /> agagem2023@gmail.com
              </p>
              <p>
              <LazyImage
                src="/cell.png"
                width={20} height={20}
                alt="icon"
              /> 3232882017
              </p>
              <p>
              <LazyImage
                src="/insta.png"
                width={20} height={20}
                alt="icon"
              />{" "}
                <a href="https://instagram.com/agagem_?igshid=MzRlODBiNWFlZA==">
                  @agegem_
                </a>
              </p>
            </div>
            <div className={styles.footerImage}>
              <LazyImage
                src="/agagem3.png"
                width={112} height={63}
                alt="icon"
              />
            </div>
          </section>
        </section>

        <span>
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
