import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetails: React.FC = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Детали проекта</h1>
      <p>Slug: {slug}</p>
    </div>
  );
};

export default ProjectDetails;
