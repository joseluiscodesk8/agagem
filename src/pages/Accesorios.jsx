import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import { EffectCoverflow, Navigation } from "swiper/modules";
import styles from "../styles/index.module.scss";

const Accesorios = () => {
  return (
    <>
      <div className={styles.pack}>
        <picture>
          <Swiper
            effect={"coverflow"} // Cambia el efecto a "slide"
            grabCursor={true}
            navigation={true} // Habilita la navegación
            modules={[Navigation, EffectCoverflow]} // Agrega el módulo de navegación
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            freeMode={true}
            className={styles.swiper}
          >
            <SwiperSlide>
              <Image src="/e1.jpg" width={200} height={200} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/e3.jpg" width={200} height={200} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/e2.jpg" width={200} height={200} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/e4.jpg" width={200} height={200} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/e5.jpg" width={200} height={200} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/e6.jpg" width={200} height={200} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/e7.jpg" width={200} height={200} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/e8.jpg" width={200} height={200} alt="img" />
            </SwiperSlide>
          </Swiper>
        </picture>
      </div>
    </>
  );
};

export default Accesorios;
