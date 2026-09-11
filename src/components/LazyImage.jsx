"use client";

import { useEffect, useRef } from "react";

/* eslint-disable-next-line @next/next/no-img-element */
const LazyImage = ({ src, alt, width = 300, height = 300 }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          image.src = src;
          observer.disconnect();
        }
      });
    });

    observer.observe(image);

    return () => observer.disconnect();
  }, [src]);

  return <img ref={imageRef} alt={alt} width={width} height={height} />;
};

export default LazyImage;