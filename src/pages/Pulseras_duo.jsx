import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Navigation } from "swiper/modules";
import styles from "../styles/index.module.scss";

const Puleras_duo = () => {
  return (
    <>
      <div className={styles.pack}>
        <picture>
          <Swiper
            grabCursor={true}
            navigation={true} 
            modules={[Navigation]} 
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

export default Puleras_duo;
