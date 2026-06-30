import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useLocation } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths";
import { useTranslation } from "react-i18next";
import type { HeaderProps, NavItem } from "./types";
import styles from "./Header.module.css";

const NAV_ITEMS: NavItem[] = [
  {
    to: routesPaths.projects,
    labelKey: "header.menu.projects_desktop",
    labelTabletKey: "header.menu.projects_tablet",
  },
  {
    to: routesPaths.about,
    labelKey: "header.menu.about",
  },
  {
    to: routesPaths.contacts,
    labelKey: "header.menu.contacts",
  },
];

export const Header = ({ data }: HeaderProps) => {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const queryClient = useQueryClient();

  const isHome = location.pathname === routesPaths.home;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      const isInsideLang = langRef.current?.contains(target);
      const isInsideMenu = menuRef.current?.contains(target);
      const isInsideBurger = burgerRef.current?.contains(target);

      if (isLangOpen && !isInsideLang) {
        setIsLangOpen(false);
      }

      if (isMenuOpen && !isInsideMenu && !isInsideBurger) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isLangOpen, isMenuOpen]);

  const changeLang = async (code: string) => {
    await i18n.changeLanguage(code);
    setIsLangOpen(false);

    queryClient.invalidateQueries();
  };

  const currentLangCode = i18n.language;

  const displayCode =
    currentLangCode === "sr-Latn" || currentLangCode === "sr-Cyrl"
      ? "sr"
      : currentLangCode;

  const isLocalizedLanguage =
    i18n.language.startsWith("en") || i18n.language.startsWith("ru");

  const siteName = isLocalizedLanguage
    ? t("header.site_name")
    : (data?.site_name ?? "");

  const words = siteName.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logoSection}>
          {!isHome ? (
            <NavLink
              to="/"
              className={styles.logoLink}
              aria-label={t("header.ariaLabel1")}
            >
              <img
                className={styles.logoImage}
                src="/images/logo.svg"
                alt={siteName}
              />
              <span className={styles.logoText}>
                <span className={styles.logoTextFirst}>{firstWord}</span>
                <br />
                {restWords}
              </span>
            </NavLink>
          ) : (
            <div className={styles.logo}>
              <img
                className={styles.logoImage}
                src="/images/logo.svg"
                alt={siteName}
              />
              <span className={styles.logoText}>
                <span className={styles.logoTextFirst}>{firstWord}</span>
                <br />
                {restWords}
              </span>
            </div>
          )}
        </div>

        <nav className={styles.headerNav} aria-label={t("header.ariaLabel2")}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className={styles.navListItem}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.navLinkActive}`
                      : styles.navLink
                  }
                >
                  {item.labelTabletKey ? (
                    <>
                      <span className={styles.navLabelDesktop}>
                        {t(item.labelKey)}
                      </span>
                      <span className={styles.navLabelTablet}>
                        {t(item.labelTabletKey)}
                      </span>
                    </>
                  ) : (
                    t(item.labelKey)
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <div className={styles.langSwitcher} ref={langRef}>
            <button
              type="button"
              className={styles.langSwitcherButton}
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={() => {
                setIsLangOpen((prev) => !prev);
                setIsMenuOpen(false);
              }}
            >
              <span className={styles.langSwitcherCurrent}>{displayCode}</span>

              <span className={styles.langSwitcherArrow} aria-hidden="true">
                {isLangOpen ? (
                  <svg
                    className={styles.arrow}
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.92822 0L13.8564 12H1.95503e-05L6.92822 0Z"
                      fill="white"
                      fillOpacity="0.5"
                    />
                  </svg>
                ) : (
                  <svg
                    className={styles.arrow}
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.92822 12L13.8564 0H1.95503e-05L6.92822 12Z"
                      fill="white"
                      fillOpacity="0.5"
                    />
                  </svg>
                )}
              </span>
            </button>

            <ul
              className={`${styles.langSwitcherList} ${
                isLangOpen ? styles.langSwitcherListOpen : ""
              }`}
              role="listbox"
              aria-label={t("header.ariaLabel3")}
            >
              {data?.languages.map((lang) => (
                <li
                  key={lang.code}
                  className={`${styles.langSwitcherItem} ${
                    i18n.language === lang.code
                      ? styles.langSwitcherItemActive
                      : ""
                  }`}
                  role="option"
                  aria-selected={i18n.language === lang.code}
                  tabIndex={isLangOpen ? 0 : -1}
                  onClick={() => changeLang(lang.code)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      changeLang(lang.code);
                    }
                  }}
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          </div>

          <button
            ref={burgerRef}
            type="button"
            className={`${styles.burgerButton} ${
              isMenuOpen ? styles.burgerButtonOpen : ""
            }`}
            aria-label={t(
              isMenuOpen ? "header.ariaLabel4" : "header.ariaLabel5",
            )}
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setIsLangOpen(false);
            }}
          >
            <span className={styles.burgerButtonMenu} />
            <span className={styles.burgerButtonMenu} />
            <span className={styles.burgerButtonMenu} />
          </button>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        ref={menuRef}
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? `${styles.mobileMenuLink} ${styles.mobileMenuLinkActive}`
                : styles.mobileMenuLink
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </div>
    </header>
  );
};
