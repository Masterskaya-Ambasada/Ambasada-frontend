import React from "react";
import { Link } from "react-router-dom";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { routesPaths } from "../../app/providers/router/routesPaths";
import { ProjectsSearch } from "./projects-search/ProjectsSearch";

import styles from "./ProjectsPage.module.css";

const ProjectsPage: React.FC = () => {
  // Хук на уровне страницы
  const { search, updateFilters } = useUrlFilters();

  return (
    <div className={styles.projectsPage}>
      <h1>Список проектов</h1>
      
      <ProjectsSearch 
        value={search}
        onChange={(newSearch) => updateFilters({ search: newSearch })}
      />
      
      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};

export default ProjectsPage;