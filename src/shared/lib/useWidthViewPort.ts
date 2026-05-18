import { useState, useEffect } from "react";

export function useViewportWidth(): { isMobile: boolean; isTablet: boolean } {
  const getDeviceType = (width: number) => ({
    isMobile: width < 834,
    isTablet: width >= 834 && width < 1440,
  });

  const [deviceType, setDeviceType] = useState(() => {
    if (typeof window !== "undefined") {
      return getDeviceType(window.innerWidth);
    }
    return { isMobile: false, isTablet: false };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let prevWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const prevIsMobile = prevWidth < 834;
      const currentIsMobile = currentWidth < 834;

      if (prevIsMobile !== currentIsMobile) {
        setDeviceType(getDeviceType(currentWidth));
      }

      prevWidth = currentWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}
