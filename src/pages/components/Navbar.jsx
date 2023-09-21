import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from '../../styles/index.module.scss'


const Navbar = ( ) => {

  return (
    <>
      <section className={styles.navContainer}>
        <button className={styles.navArrow} onClick={() => scrollToSection(menuItems[currentPage - 1])}>
          <FiChevronLeft />
        </button>

        <nav className={styles.nav_agagem}>
        <ul>
         <li>skaye</li>
         <li>skaye</li>
         <li>skaye</li>
         <li>skaye</li>
         <li>skaye</li>
         <li>skaye</li>
        </ul>
          </nav>

          <button className={styles.navArrow} onClick={() => scrollToSection(menuItems[currentPage + 1])}>
            <FiChevronRight />
          </button>
      </section>
    </>
  );
};

export default Navbar;
