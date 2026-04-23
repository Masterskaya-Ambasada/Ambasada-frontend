import styles from "./FooterLegalLinks.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  legalLinks?: Record<string, string>;
  loading: boolean;
};

export const FooterLegalLinks = ({ legalLinks, loading }: Props) => {
  const { t } = useTranslation();

  if (loading || !legalLinks) return null;

  return (
    <div className={styles.legal}>
      {Object.entries(legalLinks).map(([key, url]) => (
        <a key={key} href={url} className={styles.link}>
          {t(`footer.legal.${key}`)}
        </a>
      ))}
    </div>
  );
};
