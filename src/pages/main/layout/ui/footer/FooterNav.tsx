import styles from "./FooterNav.module.css";
import { useTranslation } from "react-i18next";

export const FooterNav = () => {
  const { t } = useTranslation();

  const NAV_ITEMS = [
    { key: "catalog", href: "/catalog" },
    { key: "about", href: "/about" },
    { key: "contacts", href: "/contacts" },
  ];

  return (
    <nav aria-label="Footer navigation">
      <ul className={styles.footerNav}>
        {NAV_ITEMS.map((item) => (
          <li key={item.key}>
            <a href={item.href} className={styles.footerNavLink}>
              {t(`footer.nav.${item.key}`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
