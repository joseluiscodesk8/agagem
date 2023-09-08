import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "../styles/index.module.scss";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const images = [
  "/e1.jpg",
  "/e2.jpg",
  "/e3.jpg",
  "/e4.jpg",
  "/e5.jpg",
  "/e6.jpg",
  "/e7.jpg",
  "/e8.jpg",
  "/e9.jpg",
  
];

const pulseraDuo = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className={styles.agagem}>
      <buttons className="next" onClick={() => paginate(1)}>
        <FiChevronLeft />
      </buttons>
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
      <buttons className="prev" onClick={() => paginate(-1)}>
        <FiChevronRight />
      </buttons>
      </div>
    </>
  );
};

export default pulseraDuo;
