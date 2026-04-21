import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "../providers/router/routesPaths";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <Link to={routesPaths.home}>Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
