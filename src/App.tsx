import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// LAZY-ИМПОРТЫ страниц (code splitting по роутам)
const Home = lazy(() => import("./pages/Home"));
const ProjectsList = lazy(() => import("./pages/ProjectsList"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const About = lazy(() => import("./pages/About"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Policy = lazy(() => import("./pages/Policy"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<div className="loading">Загрузка приложения...</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/:slug" element={<ProjectDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="policy" element={<Policy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

// Компонент 404
const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <a href="/" className="home-link">
        Вернуться на главную
      </a>
    </div>
  );
};

export default App;
