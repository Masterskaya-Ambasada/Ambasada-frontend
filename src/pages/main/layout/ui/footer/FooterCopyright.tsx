import styles from "./FooterCopyright.module.css";

type Props = {
  copyright?: string;
  loading: boolean;
};

export const FooterCopyright = ({ copyright, loading }: Props) => {
  if (loading || !copyright) return null;

  return <div className={styles.copyright}>{copyright}</div>;
};
