import React, { useState } from "react";
import Link from "next/link";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import styles from "../../styles/index.module.scss";

const Navbar = () => {
  const navigationItems = [
    { label: "Inicio", href: "/" },
    { label: "Resina", href: "/Resina" },
    { label: "pulseras_duo", href: "/Pulseras_duo" },
    { label: "pulseras_duox3", href: "/Pulseras_duox3" },
    { label: "Candongas", href: "/Candongas" },
  ];

  const [menuPosition, setMenuPosition] = useState(0);

  const handleMoveUp = () => {
    if (menuPosition > 0) {
      setMenuPosition(menuPosition - 1);
    }
  };

  const handleMoveDown = () => {
    if (menuPosition < navigationItems.length - 1) {
      setMenuPosition(menuPosition + 1);
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
            transition: "transform 0.3s ease",
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

