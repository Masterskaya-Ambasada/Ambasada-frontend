import React, {
  useRef,
  useEffect,
  useCallback,
  type TextareaHTMLAttributes,
} from "react";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import styles from "./adaptiveTextArea.module.css";

type DeviceType = "desktop" | "tablet" | "mobile";

export const AdaptiveTextarea: React.FC<
  TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ onChange, value, ...props }) => {
  const DESKTOP_HEIGHT = 288;
  const TABLET_MIN_HEIGHT = 219;
  const TABLET_MAX_HEIGHT = 359;
  const MOBILE_MAX_HEIGHT = 450;

  const { isMobile, isTablet } = useViewportWidth();

  const device: DeviceType = isMobile
    ? "mobile"
    : isTablet
      ? "tablet"
      : "desktop";

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getHeightLimits = useCallback(() => {
    switch (device) {
      case "tablet":
        return { min: TABLET_MIN_HEIGHT, max: TABLET_MAX_HEIGHT };
      case "mobile":
        return { min: 0, max: MOBILE_MAX_HEIGHT };
      default:
        return { min: DESKTOP_HEIGHT, max: DESKTOP_HEIGHT };
    }
  }, [device]);

  const updateAdaptiveHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || device === "desktop") return;

    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    const limits = getHeightLimits();

    if (device === "tablet") {
      const newHeight = Math.max(scrollHeight, limits.min);

      if (newHeight > limits.max) {
        textarea.style.height = `${limits.max}px`;
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    } else {
      if (scrollHeight > limits.max) {
        textarea.style.height = `${limits.max}px`;
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }
  }, [device, getHeightLimits]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (device === "desktop") {
      textarea.style.height = `${DESKTOP_HEIGHT}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
      updateAdaptiveHeight();
    }
  }, [device, updateAdaptiveHeight]);

  useEffect(() => {
    if (device !== "desktop") {
      updateAdaptiveHeight();
    }
  }, [value, device, updateAdaptiveHeight]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (device !== "desktop") {
      updateAdaptiveHeight();
    }
    onChange?.(e);
  };

  return (
    <textarea
      ref={textareaRef}
      onChange={handleInput}
      value={value}
      className={styles.textarea}
      {...props}
    />
  );
};
