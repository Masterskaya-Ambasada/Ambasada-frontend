/*
Как проверить компонент

import { MainInfo } from "../../pages/project-details/MainInfo";

const mainInfo = {
    picture: ["/images/01.jpg", "/images/02.jpg", "/images/03.jpg"],
    title: "Звездарска шума",
    description:
      "Звездарский лес — одна из крупнейших зелёных зон Белграда и важное общественное пространство для жителей окружающих районов. Это исследование посвящено тому, как парк используется сегодня и как его воспринимают люди, которые проводят здесь время ежедневно",
    tags: [
      "2024",
      "2025",
      "2026",
      "парк",
      "лес",
      "брендинг",
      "исследование",
      "навигация",
      "экология",
      "инфраструктура",
      "дизайн",
      "благоустройство",
    ],
  };
  ...
  <MainInfo {...mainInfo} />

*/

import { useState, useEffect } from "react";
import styles from "./MainInfo.module.css";
import { PicCircle } from "./PicCircle";

interface IMainInfo {
  picture: string[];
  title: string;
  description: string;
  tags: string[];
}

function MainInfo(props: IMainInfo) {
  const tags = props.tags;
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 833);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleExpand = () => {
    setExpanded(true);
  };

  const visibleTags =
    isMobile && !expanded && tags.length > 5
      ? [...tags.slice(0, 5), "..."]
      : tags;

  return (
    <div className={styles.container_mainInfo}>
      <PicCircle pictures={props.picture} />
      <div className={styles.infoBlock}>
        <div className={styles.info}>
          <h2 className={styles.title}>{props.title}</h2>
          <div className={styles.descriptions}>
            <p className={styles.description}>{props.description}</p>
            <ul className={styles.tags}>
              {visibleTags.map((item, index) => (
                <li key={index}>
                  {item === "..." ? (
                    <button
                      className={styles.tag}
                      onClick={item === "..." ? handleExpand : undefined}
                    >
                      {item}
                    </button>
                  ) : (
                    <span className={styles.tag}>{item}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
