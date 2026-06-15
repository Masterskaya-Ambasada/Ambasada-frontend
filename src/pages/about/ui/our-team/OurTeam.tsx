import { Link } from "react-router-dom";
import styles from "./OurTeam.module.css";
import type { ITeamProps } from "@/entities/about/model/types";

export const OurTeam = ({ data }: ITeamProps) => {
  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.title}>{data.title}</h2>

      <ul className={styles.cardWrapper}>
        {data.members.map((member) => (
          <li key={member.id}>
            <div className={styles.imgWrapper}>
              <div className={styles.gradientBg}></div>
              <img
                className={styles.img}
                src={member.photo}
                alt={`${member.name} - ${member.role}`}
              />
            </div>
            <div className={styles.memberInfo}>
              <span className={styles.memberName}>{member.name}</span>
              <span className={styles.memberRole}>{member.role}</span>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to={data.action_button.link}
        className={`btn btn--primary ${styles.customButton}`}
        aria-label={data.action_button.label}
      >
        {data.action_button.label}
      </Link>
    </section>
  );
};
