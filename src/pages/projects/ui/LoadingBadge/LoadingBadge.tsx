import React from "react";
import styles from "./LoadingBadge.module.css";

interface LoadingBadgeProps {
  visible: boolean;
  label: string;
}

export const LoadingBadge: React.FC<LoadingBadgeProps> = ({
  visible,
  label,
}) => {
  if (!visible) return null;

  return (
    <div className={styles.badge} role="status" aria-live="polite">
      <span className={styles.spinner} />
      <span>{label}</span>
    </div>
  );
};
