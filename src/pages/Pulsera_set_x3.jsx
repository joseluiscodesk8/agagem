// import { useState } from "react";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import Image from "next/image";
// import styles from "../styles/index.module.scss";

// const images = [
//   '/b1.JPG',
//   '/p2.jpg',
//   '/e2.jpg',
//   // Agrega más imágenes según sea necesario
// ];


// const PulseraSetx3 = () => {

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   };

//   return (
//     <div className={styles.sliderContainer}>
//     <button onClick={prevSlide} className={styles.sliderButton}>
//       Prev
//     </button>
//     <div className={styles.slider}>
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
//         >
//           <Image
//             src={image}
//             alt={`Image ${index + 1}`}
//             width={200}
//             height={200}
//             layout="fixed"
//           />
//         </div>
//       ))}
//     </div>
//     <button onClick={nextSlide} className={styles.sliderButton}>
//       Next
//     </button>
//   </div>
//   );
// }

// export default PulseraSetx3;