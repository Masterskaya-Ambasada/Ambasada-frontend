import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "../router/routesPaths";

const About: React.FC = () => {
  return (
    <div>
      <h1>О нас</h1>
      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};

export default About;
