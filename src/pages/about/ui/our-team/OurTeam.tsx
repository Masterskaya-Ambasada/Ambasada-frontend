import { Link } from "react-router-dom";
import styles from "./OurTeam.module.css";
import type { ITeamProps } from "@/entities/about/model/types";

export const OurTeam = ({ data }: ITeamProps) => {
  return (
    <section className={styles.content_wrapper}>
      <h2 className={styles.title}>{data.title}</h2>

      <ul className={styles.card_wrapper}>
        {data.members.map((member) => (
          <li key={member.id}>
            <div className={styles.img_wrapper}>
              <div className={styles.gradient_bg}></div>
              <img
                className={styles.img}
                src={member.photo}
                alt={`${member.name} - ${member.role}`}
              />
            </div>
            <div className={styles.member_info}>
              <span className={styles.member_name}>{member.name}</span>
              <span className={styles.member_role}>{member.role}</span>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to={data.action_button.link}
        className={`btn btn--primary ${styles.custom_button}`}
        aria-label={data.action_button.label}
      >
        {data.action_button.label}
      </Link>
    </section>
  );
};
