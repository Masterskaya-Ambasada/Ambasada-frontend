import type { SocialsStickyProps } from "./SocialsSticky.types";
import { SOCIAL_LABELS } from "./SocialsSticky.constants";
import { SOCIAL_ICONS } from "./SocialsSticky.icons";
import styles from "./SocialsSticky.module.css";

export const SocialsSticky = ({ socials }: SocialsStickyProps) => {
  if (!socials?.length) return null;

  return (
    <aside className={styles.wrapper} aria-label="Социальные сети">
      <ul className={styles.list}>
        {socials.map((item) => (
          <li key={item.type} className={styles.item}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LABELS[item.type]}
              className={styles.link}
            >
              <span className={styles.icon}>{SOCIAL_ICONS[item.type]}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};
