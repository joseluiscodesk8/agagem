// Navbar.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/router";
import styles from "../../styles/index.module.scss";

const Navbar = () => {
  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Resina", href: "/Resina" },
    { label: "pulseras_duo", href: "/Pulseras_duo" },
    { label: "pulseras_duox3", href: "/Pulseras_duox3" },
    { label: "Candongas", href: "/Candongas" },
  ];

  const [menuPosition, setMenuPosition] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Use the router pathname to determine the menu position
    const currentPath = router.pathname;
    const menuItem = navigationItems.find((item) => item.href === currentPath);
    if (menuItem) {
      setMenuPosition(navigationItems.indexOf(menuItem));
    }
  }, [router.pathname]);

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
    <section className={styles.navContainer}>
      <button className={styles.navArrow} onClick={handleMoveUp}>
        <FiChevronUp />
      </button>

      <nav className={styles.nav_agagem}>
        <ul
          style={{
            transform: `translateY(-${menuPosition * 20}%)`,
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
  );
};

export default Navbar;
