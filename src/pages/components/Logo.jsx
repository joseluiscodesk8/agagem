import styles from "../../styles/index.module.scss";
import LazyImage from "./LazyImagen";

const Logo = () => {
  return (
    <>
      <picture className={styles.logoAgagem}>
      <source media="(min-width: 900px)"srcSet="/logos/agagem2.webP" />
      <LazyImage
          src="/logos/agagem3.webP"
          alt="agagem"
          width={230}
          height={140}
        />
      </picture>
    </>
  );
};

export default Logo;
