import styles from "./AboutUs.module.css";
import { Link } from "react-router-dom";
import type { IAboutUsProps } from "@/entities/about/model/types";
import { useTranslation } from "react-i18next";

export const AboutUs = ({ data }: IAboutUsProps) => {
  const { t } = useTranslation("common");

  return (
    <section className={styles.aboutSection} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.squares} aria-hidden="true">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <div key={i} className={styles.square} />
            ))}
        </div>
        <div className={styles.img} aria-hidden="true" />
        <nav aria-label="Хлебные крошки">
          <ul className={styles.breadcrumbs}>
            <li>
              <Link to="/" className={styles.breadcrumbLink}>
                {t("navigation.home", "Главная")}
              </Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li aria-current="page">{t("navigation.about", "О сообществе")}</li>
          </ul>
        </nav>

        <div className={styles.contentWrapper}>
          <h1 id="about-title" className={styles.title}>
            {data.title}
          </h1>
          <div className={styles.paragraphsContainer}>
            {data.paragraphs.map((paragraph, index) => (
              <div key={index} className={styles.paragraphCard}>
                <p className={styles.firstSentence}>
                  {`${paragraph.first_sentence} `}

                  <span className={styles.mainText}>
                    {`${paragraph.main_text}`}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <Link
            to={data.action_button.link}
            className={`btn btn--primary ${styles.customButton}`}
            aria-label={data.action_button.text}
          >
            {data.action_button.text}
          </Link>
        </div>
      </div>
    </section>
  );
};
