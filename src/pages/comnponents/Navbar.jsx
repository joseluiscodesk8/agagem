import Link from "next/link";
import  { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
    
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleItems, setVisibleItems] = useState(1);
    const totalItems = menuItems.length;
    
    useEffect(() => {
      // Use the route to determine the current page and set currentPage accordingly
      const currentPath = router.pathname;
      const currentPageIndex = menuItems.findIndex(
        (item) =>
          typeof item === "object"
            ? item.path === currentPath
            : `/${item.replace(" ", "-")}` === currentPath
      );
  
      if (currentPageIndex !== -1) {
        setCurrentPage(currentPageIndex);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname]);
    

    const navigateToPage = (pageIndex) => {
      if (pageIndex >= 0 && pageIndex < menuItems.length) {
        const path =
          typeof menuItems[pageIndex] === "object"
            ? menuItems[pageIndex].path
            : `/${menuItems[pageIndex].replace(" ", "-")}`;
        router.push(path);
      }
    };

  const handleScroll = (direction) => {

    if (direction === "up" && visibleItems > 1 && currentPage > 0) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems -1);
      navigateToPage(currentPage - 1);
    } else if (direction === "down" && visibleItems < totalItems && currentPage < menuItems.length - 1) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 1)
      navigateToPage(currentPage + 1);
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
                <li key={index}
                    onClick={() => navigateToPage(index)}
                    style={{ cursor: "pointer" }}
                >
                    {typeof item === "object" ? (
                      item.label
                    ) : (
                      <span>{item}</span>
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
