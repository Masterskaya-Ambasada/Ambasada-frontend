import styles from "./FooterCopyright.module.css";

type Props = {
  copyright?: string;
};

export const FooterCopyright = ({ copyright }: Props) => {
  return (
    <div className={styles.copyright}>
      {copyright ?? ""}
    </div>
  );
};

