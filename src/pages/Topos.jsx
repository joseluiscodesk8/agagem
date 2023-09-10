import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import Image from 'next/image';
import styles from '../styles/index.module.scss'; 

const images = [
  '/ejemplo/e2.jpg',
  '/ejemplo/e22.jpg',
  '/ejemplo/e3.jpg',
  '/ejemplo/e33.jpg',
  '/ejemplo/e4.jpg',
  '/ejemplo/e44.jpg',
  '/ejemplo/e5.jpg',
  '/ejemplo/e55.jpg',
  '/ejemplo/e6.jpg',
  '/ejemplo/e66.jpg',
  '/ejemplo/e7.jpg',
  '/ejemplo/e77.jpg',
  '/candongas/c111.jpg',
  '/candongas/c222.jpg',
  '/candongas/c333.jpg',
  '/candongas/c444.jpg',
  '/candongas/c111.jpg',
];

const Topos = () => {
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

export default Topos;