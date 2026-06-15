import styles from "./OurValues.module.css";
import type { IOurValuesProps } from "@/entities/about/model/types";

export const OurValues = ({ data }: IOurValuesProps) => {
  return (
    <section className={styles.ourValuesSection}>
      <h2 className={styles.title}>{data.title}</h2>
      <ul className={styles.itemsList}>
        {data.items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
