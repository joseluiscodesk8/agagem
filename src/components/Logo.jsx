"use client";

import styles from "./Logo.module.scss";
import LazyImage from "./LazyImage";

const Logo = () => {
  return (
    <picture className={styles.logo}>
      <source media="(min-width: 900px)" srcSet="/logos/agagem2.webP" />
      <LazyImage src="/logos/agagem3.webP" alt="agagem" width={230} height={140} />
    </picture>
  );
};

export default Logo;