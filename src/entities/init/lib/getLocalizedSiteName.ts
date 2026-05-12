const CYRILLIC_SITE_NAME = "Амбасада за урбанизам";
const LATIN_SITE_NAME = "Ambasada za urbanizam";

export const getLocalizedSiteName = (
  language: string,
  fallbackSiteName: string,
): string => {
  const normalizedLanguage = language.toLowerCase();

  if (normalizedLanguage === "ru" || normalizedLanguage === "sr-cyrl") {
    return CYRILLIC_SITE_NAME;
  }

  if (normalizedLanguage === "en" || normalizedLanguage === "sr-latn") {
    return LATIN_SITE_NAME;
  }

  return fallbackSiteName;
};
