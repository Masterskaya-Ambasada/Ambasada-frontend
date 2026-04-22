import ru from "./locales/ru/common.json";
import en from "./locales/en/common.json";
import srLatn from "./locales/sr-Latn/common.json";
import srCyrl from "./locales/sr-Cyrl/common.json";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: "ru",
    supportedLngs: ["ru", "en", "sr-Latn", "sr-Cyrl"],
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      lookupLocalStorage: "i18nextLng",
      lookupCookie: "i18next",
      caches: ["localStorage", "cookie"],
    },
    interpolation: { escapeValue: false },
    resources: {
      ru: { common: ru },
      en: { common: en },
      "sr-Latn": { common: srLatn },
      "sr-Cyrl": { common: srCyrl },
    },
  });

export default i18n;
