import styles from "./OurValues.module.css";
import type { IOurValuesProps } from "./type";

export const OurValues = ({ data }: IOurValuesProps) => {
  return (
    <section className={styles.our_values_section}>
      <h2 className={styles.title}>{data.title}</h2>
      <ul className={styles.items_list}>
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
