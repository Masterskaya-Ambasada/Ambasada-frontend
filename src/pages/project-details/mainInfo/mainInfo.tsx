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

  return (
    <div className={styles.container_mainInfo}>
      <PicCircle pictures={props.picture} />
      <div className={styles.infoBlock}>
        <div className={styles.info}>
          <h2 className={styles.title}>{props.title}</h2>
          <div className={styles.descriptions}>
            <p className={styles.description}>{props.description}</p>
            <div className={styles.tags}>
              {tags.map((item, index) => (
                <span className={styles.tag} key={index}>
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
