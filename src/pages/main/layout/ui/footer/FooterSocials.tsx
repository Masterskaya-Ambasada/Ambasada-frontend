import styles from "./FooterSocials.module.css";

type Props = {
  socials?: {
    linkedin?: string;
    telegram?: string;
    instagram?: string;
    facebook?: string;
    email?: string;
  };
  loading: boolean;
};

export const FooterSocials = ({ socials, loading }: Props) => {
  if (loading || !socials) return null;

  return (
    <div className={styles.socials}>
      {socials.linkedin && (
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <img src="/icons_socials/linkedin.svg" className={styles.icon} />
        </a>
      )}

      {socials.telegram && (
        <a
          href={socials.telegram}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
        >
          <img src="/icons_socials/telegram.svg" className={styles.icon} />
        </a>
      )}

      {socials.instagram && (
        <a
          href={socials.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <img src="/icons_socials/instagram.svg" className={styles.icon} />
        </a>
      )}

      {socials.facebook && (
        <a
          href={socials.facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <img src="/icons_socials/facebook.svg" className={styles.icon} />
        </a>
      )}

      {socials.email && (
        <a href={`mailto:${socials.email}`} aria-label="Email">
          <img src="/icons_socials/email.svg" className={styles.icon} />
        </a>
      )}
    </div>
  );
};
