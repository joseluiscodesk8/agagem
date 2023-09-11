import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import Image from 'next/image';
import styles from '../styles/index.module.scss'; 

const images = [
  '/ejemplo/y1.jpg',
  '/ejemplo/c1.jpg',
  '/ejemplo/e222.jpg',
  '/ejemplo/p1.jpg',
  '/ejemplo/e44.jpg',
  '/ejemplo/e5.jpg',
  '/ejemplo/e66.jpg',
  '/ejemplo/e77.jpg',
];

const Pulsera_set_x3 = () => {
  const swiperRef = useRef(null);

  return (
    <>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -100],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className={styles.mySwiper}
        ref={swiperRef}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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

export default Pulsera_set_x3;


