import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "../router";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to={routesPaths.projects}>Проекты</Link>
    </div>
  );
};

export default Home;
