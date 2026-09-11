import Link from "next/link";
import styles from "./Footer.module.scss";
import LazyImage from "./LazyImage";

const Footer = ({ side = false }) => {
  return (
    <footer className={`${styles.footer} ${side ? styles.inSidebar : ""}`}>
      <section className={styles.container}>
        <section>
          <div className={styles.content}>
            <h3>Agagem Arte y Accesorios</h3>
            <span>
              <LazyImage src="/icons/gps.png" width={20} height={20} alt="icon" />{" "}
              Medellin Antioquia
            </span>
            <span>
              <LazyImage src="/icons/letter.png" width={20} height={20} alt="icon" />{" "}
              agagem2023@gmail.com
            </span>
            <span>
              <LazyImage src="/icons/cell.png" width={20} height={20} alt="icon" />{" "}
              3232882017
            </span>
            <span>
              <LazyImage src="/icons/insta.png" width={20} height={20} alt="icon" />{" "}
              <a href="https://instagram.com/agagem_?igshid=MzRlODBiNWFlZA==">
                @agegem_
              </a>
            </span>
          </div>
          <div className={styles.image}>
            <LazyImage src="/logos/agagem3.png" width={112} height={63} alt="icon" />
          </div>
        </section>
      </section>
    </footer>
  );
};

export default Footer;