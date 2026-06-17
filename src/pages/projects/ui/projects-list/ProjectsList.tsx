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
  currentFilters?: {
    search?: string;
    type?: string;
    tags?: string[];
  };
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  currentFilters = {},
}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.grid}>
        {projects.map((project) => {
          // Формируем URL для перехода
          const projectLink = project.action_button.link.replace(
            "{id}",
            project.id,
          );

          return (
            <li key={project.id} className={styles.card}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.image}
                loading="lazy"
              />

              <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>

                <Link
                  to={projectLink}
                  state={{ fromProjects: currentFilters }}
                  className={styles.button}
                  aria-label={project.action_button.label}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};
