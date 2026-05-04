import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectsList.module.css";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  action_button: {
    label: string;
    link: string;
  };
}

interface ProjectsListProps {
  projects: Project[];
  limit?: number;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  limit,
}) => {
  const visibledProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {visibledProjects.map((project) => (
          <div key={project.id} className={styles.card}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
            />

            <div className={styles.content}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>

              <Link
                to={project.action_button.link.replace("{id}", project.id)}
                className={styles.button}
              >
                <img
                  src="/button for cards.svg"
                  alt=""
                  className={styles.icon}
                />
                <span className={styles.buttonText}>
                  {project.action_button.label}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
