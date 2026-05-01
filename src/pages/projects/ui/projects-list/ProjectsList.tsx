import React from "react";
import styles from "./ProjectsList.module.css"; 

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;      // URL изображения
}

interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            {project.image && (
              <img 
                src={project.image} 
                alt={project.title} 
                className={styles.image} 
              />
            )}
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};