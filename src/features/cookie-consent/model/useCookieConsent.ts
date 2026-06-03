import { useState } from "react";
import { COOKIE_CONSENT_NAME } from "../config/cookieConsent";
import { getCookie, setCookie } from "../../../shared/lib/cookie/cookie";

export const useCookieConsent = () => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    const consent = getCookie(COOKIE_CONSENT_NAME);
    return !consent;
  });

  const accept = () => {
    setCookie(COOKIE_CONSENT_NAME, "true");
    setIsVisible(false);
  };

  return {
    isVisible,
    accept,
  };
};
