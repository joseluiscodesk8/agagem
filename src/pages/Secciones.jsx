import Image from "next/image";
import styles from '../styles/index.module.scss';

const images = [
  "/llaveros/k1.jpg",
  "/llaveros/k2.jpg",
  "/llaveros/k3.jpg",
  "/llaveros/k4.jpg",
  "/llaveros/k5.jpg",
  "/llaveros/k6.jpg",
  "/llaveros/k7.jpg",
  "/llaveros/k8.jpg",
  "/llaveros/k9.jpg",
  "/llaveros/k10.jpg",
];

const Secciones = () => {
      
  return (
    <>
      <section className={styles.resina}>
        {images.map((image, index) => (
          <figure key={index}>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={300}
              height={300}
              loading="lazy"
            />
          </figure>
        ))}
      </section>
    </>
  );
};

export default Secciones;
