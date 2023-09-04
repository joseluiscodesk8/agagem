import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import styles from '../styles/index.module.scss'

const Bisuteria = () => {
    return (
        <>
            <div className={styles.pack}>
            <picture>
        <Swiper
          effect={"slide"} // Cambia el efecto a "slide"
          grabCursor={true}
          navigation={true} // Habilita la navegación
          modules={[Navigation]} // Agrega el módulo de navegación
          autoplay={{ delay: 2000, disableOnInteraction: true }}
          freeMode={true}
          className={styles.swiper}
        >
          <SwiperSlide>
            <Image src="/p1.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/p2.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/p3.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/p4.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/p5.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/p6.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/p7.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/p8.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/p9.jpg" width={200} height={200} alt="img" />
          </SwiperSlide>
        </Swiper>
        </picture>
            </div>
        </>
    )
}

export default Bisuteria