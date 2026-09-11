"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const navigationItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Resina", href: "/resina" },
      { label: "Pulseras_duo", href: "/pulseras-duo" },
      { label: "Pulseras_duox3", href: "/pulseras-duox3" },
      { label: "Candongas", href: "/candongas" },
      { label: "Topos", href: "/topos" },
      { label: "Tobilleras", href: "/tobilleras" },
    ],
    []
  );

  const pathname = usePathname();
  const router = useRouter();
  const [menuPosition, setMenuPosition] = useState(0);

  useEffect(() => {
    const menuItem = navigationItems.find((item) => item.href === pathname);
    if (menuItem) {
      setMenuPosition(navigationItems.indexOf(menuItem));
    }
  }, [pathname, navigationItems]);

  const handleMoveUp = () => {
    if (menuPosition > 0) {
      const next = menuPosition - 1;
      setMenuPosition(next);
      router.push(navigationItems[next].href);
    }
  };

  const handleMoveDown = () => {
    if (menuPosition < navigationItems.length - 1) {
      const next = menuPosition + 1;
      setMenuPosition(next);
      router.push(navigationItems[next].href);
    }
  };

  return (
    <section className={styles.navContainer}>
      <button
        className={styles.navArrow}
        onClick={handleMoveUp}
        aria-label="Mover hacia arriba"
      >
        <FiChevronUp />
      </button>

      <nav className={styles.nav}>
        <ul style={{ "--menu-position": menuPosition }}>
          {navigationItems.map((item) => (
            <li key={item.href}>
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
  );
};

export default Navbar;