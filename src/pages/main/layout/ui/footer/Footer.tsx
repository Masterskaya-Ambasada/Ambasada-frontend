import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

import { FooterNav } from "./nav/FooterNav";
import { FooterSocials } from "./socials/FooterSocials";
import { FooterLegalLinks } from "./legalLinks/FooterLegalLinks";
import { FooterCopyright } from "./copyright/FooterCopyright";
import type { FooterData } from "./types";

type Props = {
  data: FooterData;
};

export const Footer = ({ data }: Props) => {
  const { t } = useTranslation("common");


  const siteNameRaw =
    t("site_name", {
      defaultValue: data.site_name ?? "Амбасада за Урбанизам",
    });

  const words = siteNameRaw.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>

        {/* TOP ROW */}
        <div className={styles.topRow}>
          <a
            href="/"
            aria-label={siteNameRaw}
            className={styles.logoLink}
          >

            {/* LOGO IMAGE */}
            <img
              src="/logo.svg"
              alt={siteNameRaw}
              className={styles.logoImage}
            />

            {/*новый layout текста*/}
            <span className={styles.logoText}>
              <span className={styles.logoTextMain}>
                {firstWord}
              </span>

              {restWords && (
                <span className={styles.logoTextSub}>
                  {restWords}
                </span>
              )}
            </span>

          </a>

          <div className={styles.rightBlock}>
            <FooterNav />
            <FooterSocials socials={data.socials} />
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className={styles.bottomRow}>
          <FooterCopyright copyright={data?.copyright} />
          <FooterLegalLinks legalLinks={data?.legal_links} />
        </div>

        {/* ДЕКОРАТИВНЫЙ ПАТТЕРН (как в Figma) */}
        <div className={styles.pattern} aria-hidden="true">
          {/* Первая группа (правая часть) */}
          <div className={styles.rect138} />
          <div className={styles.rect139} />
          <div className={styles.rect140} />
          <div className={styles.rect143} />
          <div className={styles.rect146} />
          <div className={styles.rect147} />
          <div className={styles.rect148} />
          <div className={styles.rect149} />
          <div className={styles.rect150} />
          <div className={styles.rect151} />
          <div className={styles.rect153} />
          <div className={styles.rect144} />
          <div className={styles.rect141} />
          <div className={styles.rect145} />
          <div className={styles.rect152} />
          <div className={styles.rect154} />
          <div className={styles.rect142} />

          {/* Вторая группа (левая часть) */}
          <div className={styles.rect138b} />
          <div className={styles.rect139b} />
          <div className={styles.rect140b} />
          <div className={styles.rect143b} />
          <div className={styles.rect146b} />
          <div className={styles.rect147b} />
          <div className={styles.rect148b} />
          <div className={styles.rect149b} />
          <div className={styles.rect150b} />
          <div className={styles.rect151b} />
          <div className={styles.rect153b} />
          <div className={styles.rect144b} />
          <div className={styles.rect141b} />
          <div className={styles.rect145b} />
          <div className={styles.rect152b} />
          <div className={styles.rect154b} />
          <div className={styles.rect142b} />
        </div>
      </div>
    </footer>
  );
};
