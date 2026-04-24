import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "../../../../app/providers/router/routesPaths";

const ProjectsList: React.FC = () => {
  return (
    <div>
      <h1>Список проектов</h1>
      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};

export default ProjectsList;
