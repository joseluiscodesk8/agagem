import Image from "next/image";
import styles from "../styles/index.module.scss";

const PulseraSetx3 = () => {

    const width = 220;
  const height = 200;
    return (
        <div className={styles.pack}>
        <div className={styles.customSlider}>
          <div className={styles.sliderItem}>
            <Image src="/p1.jpg" width={width} height={height} alt="img" />
          </div>
          <div className={styles.sliderItem}>
            <Image src="/p2.jpg" width={width} height={height} alt="img" />
          </div>
          <div className={styles.sliderItem}>
            <Image src="/p2.jpg" width={width} height={height} alt="img" />
          </div>
          <div className={styles.sliderItem}>
            <Image src="/p2.jpg" width={width} height={height} alt="img" />
          </div>
          <div className={styles.sliderItem}>
            <Image src="/p2.jpg" width={width} height={height} alt="img" />
          </div><div className={styles.sliderItem}>
            <Image src="/p2.jpg" width={width} height={height} alt="img" />
          </div>
          <div className={styles.sliderItem}>
            <Image src="/p2.jpg" width={width} height={height} alt="img" />
          </div>
        </div>
      </div> 
    )
}

export default PulseraSetx3;