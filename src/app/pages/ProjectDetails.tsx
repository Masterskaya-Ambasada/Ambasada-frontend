import React from "react";
import { Link, useParams } from "react-router-dom";
import { routesPaths } from "../providers/router/routesPaths";

const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <h1>Детали проекта</h1>
      <p>Проект: {slug}</p>
      <Link to={routesPaths.projects}>Назад к проектам</Link>
    </div>
  );
};

export default ProjectDetails;
