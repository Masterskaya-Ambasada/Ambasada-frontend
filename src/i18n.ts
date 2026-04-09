import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: true,
    fallbackLng: "ru",
    supportedLngs: ["ru", "en", "sr"],
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      lookupLocalStorage: "i18nextLng",
      lookupCookie: "i18next",
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
