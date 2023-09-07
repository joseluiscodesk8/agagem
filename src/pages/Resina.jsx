import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "../styles/index.module.scss";

const Resina = () => {
  let width = 220;
  let height = 200;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Si deseas flechas de navegación
  };

  return (
    <>
      <section  className={styles.pack}>
        <Slider {...settings} className={styles.slider}>
          <figure>
            <Image src="/p1.jpg" width={width} height={height} alt="img" />
          </figure>
          <figure>
            <Image src="/p2.jpg" width={width} height={height} alt="img" />
          </figure>
          <figure>
            <Image src="/p3.jpg" width={width} height={height} alt="img" />
          </figure>
          <figure>
            <Image src="/p4.jpg" width={width} height={height} alt="img" />
          </figure>
          <figure>
            <Image src="/p5.jpg" width={width} height={height} alt="img" />
          </figure>
          <figure>
            <Image src="/p6.jpg" width={width} height={height} alt="img" />
          </figure>
          <figure>
            <Image src="/p7.jpg" width={width} height={height} alt="img" />
          </figure>
          <figure>
            <Image src="/p8.jpg" width={width} height={height} alt="img" />
          </figure>
          <figure>
            <Image src="/p9.jpg" width={width} height={height} alt="img" />
          </figure>
        </Slider>
      </section>
    </>
  );
};

export default Resina;
