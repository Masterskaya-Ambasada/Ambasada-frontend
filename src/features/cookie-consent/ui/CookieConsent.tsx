import React from "react";
import { useTranslation } from "react-i18next";
import type { ICookieConsent } from "../model/types";
import { useCookieConsent } from "../model/useCookieConsent";
import styles from "./CookieConsent.module.css";

export const CookieConsent: React.FC<ICookieConsent> = ({
  text,
  confirmButtonText,
}) => {
  const { t } = useTranslation("common");
  const { isVisible, accept } = useCookieConsent();

  if (!isVisible) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-live="polite"
      aria-label={t("cookieConsent.ariaLabel")}
    >
      <div className={styles.container}>
        <p className={styles.text}>{text}</p>

        <button
          className={`btn btn--primary ${styles.button}`}
          onClick={accept}
          aria-label={t("cookieConsent.acceptButtonAriaLabel")}
        >
          {confirmButtonText}
        </button>
      </div>
    </div>
  );
};
