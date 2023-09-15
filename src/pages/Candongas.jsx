import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import Image from 'next/image';
import styles from '../styles/index.module.scss'; 

const images = [
  '/candongas/c1.jpg',
  '/candongas/c2.jpg',
  '/candongas/c3.jpg',
  '/candongas/c4.jpg',
  '/candongas/c5.jpg',
  '/candongas/c6.jpg',
  '/candongas/c7.jpg',
  '/candongas/c8.jpg',
];

const Candogas = () => {
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

export default Candogas;

