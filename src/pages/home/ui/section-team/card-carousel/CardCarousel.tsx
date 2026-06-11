import type React from "react";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";
import styles from "./CardCarousel.module.css";
import type { Member } from "../type";

interface CardCarouselProps {
  cards: Member[];
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cards }) => {
  const { t } = useTranslation("common");

  const containerRef = useRef<HTMLUListElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return;

      setShowButtons(
        containerRef.current.scrollWidth > containerRef.current.clientWidth,
      );
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [cards]);
  return (
    <div className={styles.wrapper}>
      {showButtons && (
        <button
          className={`${styles.button} ${styles.left}`}
          onClick={() => scroll("left")}
          aria-label={t("card_carousel.button_left")}
        >
          <svg
            width="13"
            height="24"
            viewBox="0 0 13 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1896 0C12.3952 0 12.6056 0.0805608 12.7633 0.236943C13.0789 0.549709 13.0789 1.06151 12.7633 1.37427L1.96267 12.0794L12.6056 22.6281C12.9211 22.9409 12.9211 23.4527 12.6056 23.7654C12.29 24.0782 11.7736 24.0782 11.4581 23.7654L0.236668 12.648C-0.0788893 12.3353 -0.0788893 11.8235 0.236668 11.5107L11.6111 0.236943C11.7736 0.0758219 11.9792 0 12.1896 0Z"
              fill="#FCFFFF"
            />
          </svg>
        </button>
      )}
      <ul className={styles.card_wrapper} ref={containerRef}>
        {cards.map((card, index) => (
          <li key={`${card.name}-${index}`}>
            <div className={styles.card_container}>
              <div
                className={`${styles.bg_shape} ${
                  index % 2 === 0
                    ? styles.bg_shape_purple
                    : styles.bg_shape_green
                }`}
              />

              <div className={styles.photo_container}>
                <img src={card.photo} alt={card.name} loading="lazy" />
              </div>
              <span className={styles.name}>{card.name}</span>
            </div>
          </li>
        ))}
      </ul>
      {showButtons && (
        <button
          className={`${styles.button} ${styles.right}`}
          onClick={() => scroll("right")}
          aria-label={t("card_carousel.button_right")}
        >
          <svg
            width="13"
            height="24"
            viewBox="0 0 13 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.810431 0C0.60484 0 0.394445 0.0805608 0.236667 0.236943C-0.0788908 0.549709 -0.0788908 1.06151 0.236667 1.37427L11.0373 12.0794L0.394444 22.6281C0.078887 22.9409 0.078887 23.4527 0.394444 23.7654C0.710002 24.0782 1.22637 24.0782 1.54193 23.7654L12.7633 12.648C13.0789 12.3353 13.0789 11.8235 12.7633 11.5107L1.38893 0.236943C1.22637 0.0758219 1.0208 0 0.810431 0Z"
              fill="#FCFFFF"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
export default CardCarousel;
