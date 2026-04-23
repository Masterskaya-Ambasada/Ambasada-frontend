import styles from "./Footer.module.css";
import { useInit } from "../../../../../shared/api/useInit";
import { useTranslation } from "react-i18next";

import { FooterNav } from "./FooterNav";
import { FooterSocials } from "./FooterSocials";
import { FooterLegalLinks } from "./FooterLegalLinks";
import { FooterCopyright } from "./FooterCopyright";

export const Footer = () => {
  const { data, loading } = useInit();
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* LOGO */}
        <div className={styles.logo}>
          <a href="/" aria-label={t("footer.aria.home")}>
            <img
              src="/logo.svg"
              alt={t("site_name")}
              className={styles.logoImage}
            />
          </a>
        </div>

        {/* NAV + SOCIALS */}
        <div className={styles.rightTop}>
          <FooterNav />
          <FooterSocials socials={data?.socials} loading={loading} />
        </div>

        {/* COPYRIGHT */}
        <div className={styles.bottomLeft}>
          <FooterCopyright copyright={data?.copyright} loading={loading} />
        </div>

        {/* LEGAL */}
        <div className={styles.bottomRight}>
          <FooterLegalLinks legalLinks={data?.legal_links} loading={loading} />
        </div>
      </div>
    </footer>
  );
};
