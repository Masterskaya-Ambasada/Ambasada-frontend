import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "../providers/router/routesPaths";

const Policy: React.FC = () => {
  return (
    <div>
      <h1>Политика конфиденциальности</h1>
      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};

export default Policy;
