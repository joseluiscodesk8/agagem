import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/router";
import styles from "../../styles/index.module.scss";
import Logo from "./Logo";
import CartAndSesion from "./CartAndSesion";

const Navbar = () => {
  const navigationItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Resina", href: "/routes/Resina" },
      { label: "pulseras_duo", href: "/routes/pulserasDuo" },
      { label: "pulseras_duox3", href: "/routes/pulserasDuox3" },
      { label: "candongas", href: "/routes/Candongas" },
      { label: "topos", href: "/routes/Topos" },
      { label: "tobilleras", href: "/routes/Tobilleras" },
    ],
    []
  );

  const [menuPosition, setMenuPosition] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Use el pathname del router para determinar la posición del menú
    const currentPath = router.pathname;
    const menuItem = navigationItems.find((item) => item.href === currentPath);
    if (menuItem) {
      setMenuPosition(navigationItems.indexOf(menuItem));
    }
  }, [router.pathname, navigationItems]);

  const handleMoveUp = () => {
    if (menuPosition > 0) {
      setMenuPosition(menuPosition - 1);
      navigateToPage(menuPosition - 1);
    }
  };

  const handleMoveDown = () => {
    if (menuPosition < navigationItems.length - 1) {
      setMenuPosition(menuPosition + 1);
      navigateToPage(menuPosition + 1);
    }
  };

  const navigateToPage = (position) => {
    const menuItem = navigationItems[position];
    if (menuItem) {
      router.push(menuItem.href);
    }
  };

  return (
    <>
      <CartAndSesion />
      <Logo />
      <section className={styles.navContainer}>
        <button
          className={styles.navArrow}
          onClick={handleMoveUp}
          aria-label="Mover hacia arriba"
        >
          <FiChevronUp />
        </button>

        <nav className={styles.nav_agagem}>
          <ul
            style={{
              transform: `translateY(-${menuPosition * 40}px)`,
              transition: "transform 0.4s ease-in-out",
            }}
          >
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={styles.navArrow}
          onClick={handleMoveDown}
          aria-label="Mover hacia abajo"
        >
          <FiChevronDown />
        </button>
      </section>
    </>
  );
};

export default Navbar;
