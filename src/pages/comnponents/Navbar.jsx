import Link from "next/link";
import  { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "../../styles/index.module.scss";

const Navbar = () => {
    const menuItems = [
        {label: "Inicio", path: "/"},
        "Resina",
        "Pulseras_duo",
        "Pulsera_set_x3",
        "Topos",
        "Candongas",
        "Tobilleras",
        "Anillos",
        "Cadenas",
    ];
    
    const [visibleItems, setVisibleItems] = useState(1);
    const totalItems = menuItems.length;

  const handleScroll = (direction) => {

    if (direction === "up" && visibleItems > 1) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems -1);
    } else if (direction === "down" && visibleItems < totalItems) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 1)
    }
  };
  return (
    <>
      <section className={styles.navContainer}>
        <button className={styles.navArrow} onClick={() => handleScroll("up")}><FiChevronLeft />
        </button>
        <nav className={styles.nav_agagem}>
            <ul style={{ transform: `translateY(-${(visibleItems - 1) * 40}px)`, transition: "transform 0.4s ease-in-out"}}>
              {menuItems.map((item, index) => (
                <li key={index}>
                    {typeof item === "object" ? (
                      <Link href={item.path}>{item.label}</Link>
                    ) : (
                      <Link href={`/${item.replace(" ", "-")}`}>{item}</Link>
                    )}
                </li>
              ))}
            </ul>
          </nav>
          <button className={styles.navArrow} onClick={() => handleScroll("down")}><FiChevronRight />
        </button>
      </section>
    </>
  );
};

export default Navbar;
