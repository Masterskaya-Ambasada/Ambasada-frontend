import styles from "./Variant1.module.css";
import { splitByFirstParagraph } from "../splitParagraph";

interface Variant1Props {
  image?: string;
  string_list?: string[];
  text?: string;
  accented_text?: string;
  mobileMode: boolean;
}

export function Variant1(props: Variant1Props) {
  const paragraphText = splitByFirstParagraph(props.text || "");

  const image = props.image ? (
    <img
      src={props.image}
      className={styles.image}
      loading="lazy"
      alt="image"
    />
  ) : null;

  const list = props.string_list ? (
    <ul className={styles.list}>
      {props.string_list.map((item, index) => (
        <li className={styles.listItems} key={index}>
          {item}
        </li>
      ))}
    </ul>
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
        <div className={styles.textContent}>
          {image}
          {firstParagraph}
          {accentedText}
          {accentedText && list}
          {!accentedText && <div className={styles.accentedText}>{list}</div>}
          {otherParagraph}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.textContent}>
        {firstParagraph}
        {accentedText}
        {accentedText && (
          <div className={styles.imageAndList}>
            {image}
            {list}
          </div>
        )}
        {!accentedText && (
          <div className={styles.accentedText}>
            <div className={styles.imageAndList}>
              {image}
              {list}
            </div>
          </div>
        )}
        {otherParagraph}
      </div>
    </>
  );
}
