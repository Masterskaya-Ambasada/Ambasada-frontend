import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "../../app/providers/router/routesPaths";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { ProjectsSearch } from "./ui/projects-search/ProjectsSearch";

import styles from "./ProjectsPage.module.css";

const ProjectsPage: React.FC = () => {
  // Хук на уровне страницы
  const { search, updateFilters } = useUrlFilters();

  return (
    <div className={styles.projectsPage}>
      <h1>Список всех проектов</h1>

      <ProjectsSearch
        value={search}
        onChange={(newSearch) => updateFilters({ search: newSearch })}
      />

      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};

export default ProjectsPage;
