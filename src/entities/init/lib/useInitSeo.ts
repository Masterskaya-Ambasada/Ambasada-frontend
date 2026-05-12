import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { InitResponse } from "../model/types";
import { getLocalizedSiteName } from "./getLocalizedSiteName";

export function useInitSeo(initData?: InitResponse) {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || "ru";

  useEffect(() => {
    if (!initData) return;

    document.title = getLocalizedSiteName(language, initData.site_name);

    let metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = initData.seo_description ?? "";
  }, [initData, language]);
}
