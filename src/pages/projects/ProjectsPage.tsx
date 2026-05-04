import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
// import { useUrlFilters } from "./hooks/useUrlFilters";
import { ProjectsList } from "./ui/projects-list/ProjectsList";
import styles from "./ProjectsPage.module.css";
import projectsData from "../../mocks/fixtures/projects/projects.json";

export const ProjectsPage: React.FC = () => {
  

  // Преобразуем данные из JSON в нужный формат
  const projects = projectsData.items.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  image: item.image,
  action_button: item.action_button,
}));

  return (
    <div className={styles.projectsPage}>
      <h1>Список всех проектов</h1>

      <ProjectsList projects={projects} limit={4} />

      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};

export default ProjectsPage;
