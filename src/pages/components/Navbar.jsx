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
      { label: "Resina", href: "/Resina" },
      { label: "pulseras_duo", href: "/Pulseras_duo" },
      { label: "pulseras_duox3", href: "/Pulseras_duox3" },
      { label: "candongas", href: "/Candongas" },
      { label: "topos", href: "/Topos"},
      { label: "tobilleras", href: "/Tobilleras"},
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
        <button className={styles.navArrow} onClick={handleMoveUp}>
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

        <button className={styles.navArrow} onClick={handleMoveDown}>
          <FiChevronDown />
        </button>
      </section>
    </>
  );
};

export default Navbar;
