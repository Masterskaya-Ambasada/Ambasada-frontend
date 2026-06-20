import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { routesPaths } from "@shared/config/routesPaths";

import styles from "./FooterNav.module.css";

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
    { key: "catalog", href: routesPaths.projects },
    { key: "about", href: routesPaths.about },
    { key: "contacts", href: routesPaths.contacts },
  ];

  return (
    <nav aria-label={t("footer.navigation")}>
      <ul className={styles.footerNav}>
        {NAV_ITEMS.map((item) => {
          let label = t(`footer.nav.${item.key}`);

          if (item.key === "catalog" && isTablet) {
            label = t("footer.nav.catalog_tablet");
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
