import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "../../app/providers/router/routesPaths";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to={routesPaths.projects}>Проекты</Link>
    </div>
  );
};

export default Home;
