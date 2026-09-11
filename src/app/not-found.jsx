import Logo from "@/components/Logo";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={styles.container}>
      <Logo />
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </section>
  );
}