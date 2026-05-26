import styles from "./FooterLegalLinks.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  legalLinks?: Record<string, string>;
};

export const FooterLegalLinks = ({ legalLinks }: Props) => {
  const { t } = useTranslation();

  if (!legalLinks) return null;

  const entries = Object.entries(legalLinks);
  if (entries.length === 0) return null;

  return (
    <div className={styles.legal}>
      {entries.map(([key, url]) => (
        <a
          key={key}
          href={url}
          className={styles.link}
        >
          {t(`footer.legal.${key}`)}
        </a>
      ))}
    </div>
  );
};
