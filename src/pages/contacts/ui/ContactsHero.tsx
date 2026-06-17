import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useViewportWidth } from "@/shared/lib/useWidthViewPort";
import styles from "./ContactsHero.module.css";
import type { ContactsHeroProps } from "./types";

export const ContactsHero = ({
  phone,
  address,
  socials,
}: ContactsHeroProps) => {
  const { t } = useTranslation("common");
  const { isMobile, isTablet } = useViewportWidth();

  const title =
    isMobile || isTablet
      ? t("contacts.titleTablet", "Свяжитесь любым удобным образом")
      : t("contacts.titleDesktop", "Свяжитесь с нами любым удобным образом");

  return (
    <section className={styles.hero}>
      <div className={styles.mapWrapper}>
        <img
          src="/mapImage.png"
          alt="Расположение офиса"
          className={styles.map}
        />
      </div>

      <div className={styles.backgroundShape} aria-hidden="true" />

      <nav
        aria-label={t("navigation.breadcrumbs", "Навигация")}
        className={styles.breadcrumbsWrapper}
      >
        <ul className={styles.breadcrumbs}>
          <li>
            <Link
              to="/"
              className={styles.breadcrumbLink}
              aria-label={t("navigation.home", "Главная")}
            >
              {t("navigation.home", "Главная")}
            </Link>
          </li>

          <li aria-hidden="true" className={styles.breadcrumbSeparator}>
            &gt;
          </li>

          <li aria-current="page" className={styles.breadcrumbCurrent}>
            {t("navigation.contacts", "Связаться с нами")}
          </li>
        </ul>
      </nav>

      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.contactBlock}>
          <h2 className={styles.subtitle}>{t("contacts.call", "Позвонить")}</h2>

          <a href={`tel:${phone}`} className={styles.link}>
            {phone}
          </a>
        </div>

        <div className={styles.contactBlock}>
          <h2 className={styles.subtitle}>{t("contacts.write", "Написать")}</h2>

          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.id} className={styles.socialItem}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src={`/icons_socials/${social.id.toLowerCase()}.svg`}
                    alt=""
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactBlock}>
          <h2 className={styles.subtitle}>
            {t("contacts.visitOffice", "Приехать в офис")}
          </h2>

          <address className={styles.address}>{address}</address>
        </div>
      </div>
    </section>
  );
};
