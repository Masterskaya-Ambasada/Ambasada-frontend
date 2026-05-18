import styles from "./Variant3.module.css";
import type { Tbutton } from "../../InfoBlock";
import { splitByFirstParagraph } from "../splitParagraph";

interface Variant3Props {
  image?: string;
  text?: string;
  accented_text?: string;
  buttons?: Tbutton[];
  mobileMode: boolean;
}

export function Variant3(props: Variant3Props) {
  const paragraphText = splitByFirstParagraph(props.text || "");
  const firstParagraph = paragraphText[0] ? (
    <div
      className={styles.notAccentedText}
      dangerouslySetInnerHTML={{ __html: paragraphText[0] }}
    />
  ) : null;
  const accentedText = props.accented_text ? (
    <div
      className={styles.accentedText}
      dangerouslySetInnerHTML={{ __html: props.accented_text }}
    />
  ) : null;
  const image = props.image ? (
    <img
      src={props.image}
      className={styles.image}
      loading="lazy"
      alt="image"
    />
  ) : null;
  const otherParagraph = paragraphText[1] ? (
    <div
      className={styles.notAccentedText}
      dangerouslySetInnerHTML={{ __html: paragraphText[1] }}
    />
  ) : null;

  const handleButtonClick = (item: Tbutton) => {
    if (item.type === "download") {
      fetch(item.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;

          const filename =
            item.url.split("/").pop() || `download_${Date.now()}`;
          link.download = filename;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке файла:", error);
          alert("Не удалось загрузить файл. Пожалуйста, попробуйте позже.");
        });
    } else if (item.type === "redirect") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  const mobileVersion = (
    <>
      {image}
      {firstParagraph}
      {accentedText}
      {otherParagraph}
    </>
  );

  const desktopVersion = (
    <>
      {firstParagraph}
      {image}
      {accentedText}
      {otherParagraph}
    </>
  );

  return (
    <div className={styles.content}>
      <div className={styles.textContent}>
        {props.mobileMode ? mobileVersion : desktopVersion}
      </div>
      {props.buttons && props.buttons.length > 0 && (
        <ul className={styles.buttonsList}>
          {props.buttons.map((item, index) => (
            <li key={index} className={styles.buttonItem}>
              {item.type === "redirect" && (
                <button
                  className={`${styles.button} btn btn--primary`}
                  onClick={() => handleButtonClick(item)}
                  aria-label={`Кнопка ${item.label}`}
                >
                  {item.label}
                </button>
              )}
              {item.type === "download" && (
                <a
                  href={item.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} btn btn--primary`}
                  aria-label={`Кнопка ${item.label}`}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
