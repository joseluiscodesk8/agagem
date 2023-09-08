import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "../styles/index.module.scss";

const variants = {
  enter: {
    x: 200,
    y: -200,
    rotateZ: -45, // Rotación en el eje Z
    opacity: 0,
  },
  center: {
    zIndex: 1,
    x: 0,
    y: 0,
    rotateZ: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    x: -200,
    y: 200,
    rotateZ: 45,
    opacity: 0,
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const images = [
  "/tobilleras/t1.jpg",
  "/tobilleras/t2.jpg",
  "/tobilleras/t3.jpg",
  "/tobilleras/t4.jpg",

];

const tobilleras = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <section className={styles.agagem}>
      <button className="next" onClick={() => paginate(1)}>
        <FiChevronLeft />
      </button>
      <AnimatePresence initial={false} custom={direction}>
      <figure>
       <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
       </figure>
      </AnimatePresence>
      <button className="prev" onClick={() => paginate(-1)}>
        <FiChevronRight />
      </button>
      </section>
    </>
  );
};

export default tobilleras;
