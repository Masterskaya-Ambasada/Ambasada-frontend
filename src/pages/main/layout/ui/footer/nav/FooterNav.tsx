import styles from "./FooterNav.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const FooterNav = () => {
  const { t } = useTranslation("common");

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const NAV_ITEMS = [
    { key: "catalog", href: "/catalog" },
    { key: "about", href: "/about" },
    { key: "contacts", href: "/contacts" },
  ];

  return (
    <nav aria-label="Footer navigation">
      <ul className={styles.footerNav}>
        {NAV_ITEMS.map((item) => {
          let label = t(`footer.nav.${item.key}`);

          if (item.key === "catalog" && isTablet) {
            label = "Проекты";
          }

          return (
            <li key={item.key}>
              <a href={item.href} className={styles.footerNavLink}>
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};


