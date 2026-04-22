import React from "react";
import styles from "./AboutUs.module.css";
import { Link } from "react-router-dom";
import type { AboutData } from "./type";

export const AboutUs: React.FC = () => {
  const [aboutData, setAboutData] = React.useState<AboutData | null>(null);

  React.useEffect(() => {
    async function getAbout() {
      try {
        const res = await fetch("api/v1/about");

        if (!res.ok) {
          throw new Error(`error status: ${res.status}`);
        }

        const data = await res.json();
        setAboutData(data.about_section);
      } catch (err) {
        console.log(err);
      }
    }
    getAbout();
  }, []);

  if (!aboutData) {
    return null;
  }

  return (
    <section className={styles.about_section} aria-labelledby="about-title">
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
              <Link to="/" className={styles.breadcrumb_link}>
                Главная
              </Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li aria-current="page">О сообществе</li>
          </ul>
        </nav>

        <div className={styles.content_wrapper}>
          <h1 id="about-title" className={styles.title}>
            {aboutData.title}
          </h1>

          <div className={styles.paragraphs_container}>
            {aboutData.paragraphs.map((paragraph, index) => (
              <article key={index} className={styles.paragraph_card}>
                <p className={styles.first_sentence}>
                  {paragraph.first_sentence}

                  <span className={styles.main_text}>
                    {paragraph.main_text}
                  </span>
                </p>
              </article>
            ))}
          </div>

          <Link
            to={aboutData.action_button.link}
            className={`${styles.custom_button} btn btn--primary`}
            aria-label={aboutData.action_button.text}
          >
            {aboutData.action_button.text}
          </Link>
        </div>
      </div>
    </section>
  );
};
