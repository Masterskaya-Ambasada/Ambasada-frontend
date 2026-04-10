import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {["ru", "en", "sr-Cyrl", "sr-Latn"].map((lng) => (
        <button key={lng} onClick={() => changeLang(lng)}>
          {lng}
        </button>
      ))}
    </div>
  );
}
