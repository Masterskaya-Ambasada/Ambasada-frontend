import styles from "./AboutCommunity.module.css";
import type { AboutCommunityProps } from "./types";
import { Link } from "react-router-dom";

export const AboutCommunity = ({ aboutPreview }: AboutCommunityProps) => {
  return (
    <section className={styles.section} aria-labelledby="about-community-title">
      {/* общая container-разметка */}
      <div className={styles.container}>
        {/* TITLE */}
        <h2 id="about-community-title" className={styles.title}>
          {aboutPreview?.title}
        </h2>

        {/* TEXT */}
        <p className={styles.text}>{aboutPreview.text}</p>

        {/* BUTTON */}
        <Link to={aboutPreview.action_button.link} className={styles.button}>
          <span className={styles.buttonText}>
            {aboutPreview.action_button.label}
          </span>
        </Link>

        {/* IMAGE */}
        <div className={styles.imageWrapper}>
          <img
            src={aboutPreview.image}
            alt={aboutPreview.title}
            className={styles.image}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
