import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const { t } = useTranslation("common");

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.code}>
          <span>4</span>
          <span className={styles.circle} aria-hidden="true" />
          <span>4</span>
        </div>
        <div className={styles.wrapper}>
          <p className={styles.text}>{t("notFound.title")}</p>

          <Link to="/" className={`btn btn--primary ${styles.button}`}>
            <span className={styles.buttonTextDesktop}>
              {t("notFound.buttonDesktop")}
            </span>
            <span className={styles.buttonTextMobile}>
              {t("notFound.buttonMobile")}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};
export default NotFound;
