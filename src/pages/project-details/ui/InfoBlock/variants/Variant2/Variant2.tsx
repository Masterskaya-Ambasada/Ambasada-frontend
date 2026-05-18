import styles from "./Variant2.module.css";
import { splitByFirstParagraph } from "../splitParagraph";

interface Variant2Props {
  image?: string;
  left_image?: string;
  text?: string;
  accented_text?: string;
  mobileMode: boolean;
}

export function Variant2(props: Variant2Props) {
  const paragraphText = splitByFirstParagraph(props.text || "");

  const image = props.image ? (
    <img
      src={props.image}
      className={styles.imageRight}
      loading="lazy"
      alt="image"
    />
  ) : null;

  const leftImage = props.left_image ? (
    <img
      src={props.left_image}
      className={styles.imageLeft}
      loading="lazy"
      alt="image"
    />
  ) : null;

  const firstParagraph = paragraphText[0] ? (
    <div dangerouslySetInnerHTML={{ __html: paragraphText[0] }} />
  ) : null;

  const accentedText = props.accented_text ? (
    <div
      className={styles.accentedText}
      dangerouslySetInnerHTML={{ __html: props.accented_text }}
    />
  ) : null;

  const otherParagraph = paragraphText[1] ? (
    <div dangerouslySetInnerHTML={{ __html: paragraphText[1] }} />
  ) : null;

  if (props.mobileMode) {
    return (
      <>
        <div className={styles.content}>
          {image}
          <div className={styles.textContent}>
            {firstParagraph}
            {accentedText}
            {otherParagraph}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.content}>
        {leftImage}
        <div className={styles.textContent}>
          {firstParagraph}
          {accentedText}
          <div className={styles.rightImageWrapper}>
            {image}
            {otherParagraph}
          </div>
        </div>
      </div>
    </>
  );
}
