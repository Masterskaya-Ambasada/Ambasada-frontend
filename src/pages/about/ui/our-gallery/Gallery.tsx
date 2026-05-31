import { useState, useEffect } from "react";
import styles from "./Gallery.module.css";
import type { ICarouselProps } from "@/entities/about/model/types";
import { useTranslation } from "react-i18next";

export const Gallery = ({ data }: ICarouselProps) => {
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation("common");

  const images = data.images || [];
  const itemsLength = images.length;

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  if (!images || images.length === 0) return null;

  if (itemsLength === 1) {
    return (
      <section className={styles.gallery_section}>
        <h2 className={styles.gallery_title}>{data.title}</h2>
        <div className={styles.single_container}>
          <img
            src={images[0].url}
            alt={images[0].alt}
            className={styles.single_image}
          />
        </div>
      </section>
    );
  }

  const prevIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1;
  const nextIndex = currentIndex === itemsLength - 1 ? 0 : currentIndex + 1;

  const nextSlide = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    setCurrentIndex(prevIndex);
  };

  return (
    <section className={styles.gallery_section}>
      <h2 className={styles.gallery_title}>{data.title}</h2>

      <div className={styles.carousel_wrapper}>
        <button
          className={`${styles.nav_button} ${styles.nav_prev}`}
          onClick={prevSlide}
          disabled={isAnimating}
          aria-label={t("gallery.previous")}
          type="button"
        >
          <svg width="13" height="24" viewBox="0 0 13 24" fill="none">
            <path
              d="M12.1896 0C12.3952 0 12.6056 0.0805608 12.7633 0.236943C13.0789 0.549709 13.0789 1.06151 12.7633 1.37427L1.96267 12.0794L12.6056 22.6281C12.9211 22.9409 12.9211 23.4527 12.6056 23.7654C12.29 24.0782 11.7736 24.0782 11.4581 23.7654L0.236668 12.648C-0.0788893 12.3353 -0.0788893 11.8235 0.236668 11.5107L11.6111 0.236943C11.7736 0.0758219 11.9792 0 12.1896 0Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <ul className={styles.slides_container}>
          <li className={`${styles.slide} ${styles.slide_prev}`}>
            <img
              src={images[prevIndex].url}
              alt={images[prevIndex].alt}
              loading="lazy"
              decoding="async"
            />
          </li>

          <li className={`${styles.slide} ${styles.slide_current}`}>
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              loading="lazy"
              decoding="async"
              className={
                isAnimating
                  ? direction === "next"
                    ? styles.slide_out_left
                    : styles.slide_out_right
                  : direction === "next"
                    ? styles.slide_in_from_right
                    : styles.slide_in_from_left
              }
            />
          </li>

          <li className={`${styles.slide} ${styles.slide_next}`}>
            <img
              src={images[nextIndex].url}
              alt={images[nextIndex].alt}
              loading="lazy"
              decoding="async"
            />
          </li>
        </ul>

        <button
          className={`${styles.nav_button} ${styles.nav_next}`}
          onClick={nextSlide}
          disabled={isAnimating}
          aria-label={t("gallery.next")}
          type="button"
        >
          <svg width="13" height="24" viewBox="0 0 13 24" fill="none">
            <path
              d="M0.810431 0C0.60484 0 0.394445 0.0805608 0.236667 0.236943C-0.0788908 0.549709 -0.0788908 1.06151 0.236667 1.37427L11.0373 12.0794L0.394444 22.6281C0.078887 22.9409 0.078887 23.4527 0.394444 23.7654C0.710002 24.0782 1.22637 24.0782 1.54193 23.7654L12.7633 12.648C13.0789 12.3353 13.0789 11.8235 12.7633 11.5107L1.38893 0.236943C1.22637 0.0758219 1.0208 0 0.810431 0Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};
