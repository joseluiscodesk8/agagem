/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";


const LazyImage = ({ src, alt, width = 300, height = 300 }) => {
  const imageRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imageRef.current.src = src;
          observer.disconnect();
        }
      });
    });

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return <img  ref={imageRef} alt={alt} width={width} height={height} />;
};

export default LazyImage;
