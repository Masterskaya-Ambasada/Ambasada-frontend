import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import styles from "./modal.module.css";

interface ModalProps {
  type: "success" | "error";
  onClose?: () => void;
}

const Modal = ({ type, onClose }: ModalProps) => {
  const { t } = useTranslation("common");
  const modalRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useViewportWidth();

  const handleClose = () => {
    onClose?.();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const titleId = `modal-title-${type}`;

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={type === "success" ? "Success modal" : "Error modal"}
    >
      <div ref={modalRef} className={styles.container}>
        <div className={styles.content}>
          {!isMobile && !isTablet && (
            <button onClick={handleClose} className={styles.closeButton}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 0.5L13.4256 13.5M0.574354 13.5L13.5 0.500001"
                  stroke="#848484"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          <h3 id={titleId} className={styles.title}>
            {type === "success" && t("contactForm.successModal.title")}
            {type === "error" && t("contactForm.errorModal.title")}
          </h3>
          <p className={styles.text}>
            {type === "success" && t("contactForm.successModal.text")}
            {type === "error" && t("contactForm.errorModal.text")}
          </p>
        </div>
        <button
          onClick={handleClose}
          className={`btn btn--primary ${styles.button}`}
        >
          {type === "success" && t("contactForm.successModal.button")}
          {type === "error" && t("contactForm.errorModal.button")}
        </button>
      </div>
    </div>
  );
};

export default Modal;
