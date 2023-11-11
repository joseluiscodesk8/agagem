import Logo from "./components/Logo";
import styles from "../styles/index.module.scss";

const Custom404 = () => {
  return (
    <section className={styles.cuatroCeroCuatro}>
      <Logo />
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </section>
  );
};

export default Custom404;
