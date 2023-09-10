import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import Image from 'next/image';
import styles from '../styles/index.module.scss'; // Importa tus estilos Sass como un objeto


const images = [
  '/e1.jpg',
  '/e2.jpg',
  '/e3.jpg',
  '/e4.jpg',
  '/e5.jpg',
  // Agrega aquí más rutas de imágenes según sea necesario
];

const Resina = () => { // Cambia el nombre de la función a Resina
  const swiperRef = useRef(null);

  return (
    <>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className={styles.mySwiper} // Aplica los estilos utilizando la variable "styles"
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiper}>
            <figure>
            <Image src={image} alt={`Slide ${index + 1}`} width={500} height={500} />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Resina; // Exporta el componente con el nombre Resina
