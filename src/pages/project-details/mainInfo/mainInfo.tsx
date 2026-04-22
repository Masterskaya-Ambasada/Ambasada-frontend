import { useState, useEffect } from "react";
import styles from "./mainInfo.module.css";
import { PicCircle } from "./picCircle";

interface mainInfoProps {
  picture: string[];
  title: string;
  description: string;
  tags: string[];
}

function MainInfo(props: mainInfoProps) {
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
            <div className={styles.tags}>
              {visibleTags.map((item, index) => (
                <span
                  className={item === "..." ? styles.tagEllipsis : styles.tag}
                  key={index}
                  onClick={item === "..." ? handleExpand : undefined}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
