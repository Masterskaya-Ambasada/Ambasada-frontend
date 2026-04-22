import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { routesPaths } from "./routesPaths";

// Lazy-импорты страниц (code splitting по роутам)
const Home = lazy(() => import("../pages/Home"));
const ProjectsList = lazy(() => import("../pages/ProjectsList"));
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));
const About = lazy(() => import("../pages/About"));
const Contacts = lazy(() => import("../pages/Contacts"));
const Policy = lazy(() => import("../pages/Policy"));
const NotFound = lazy(() => import("../../pages/not-found/ui/NotFound"));

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading">Загрузка приложения...</div>}>
      <Routes>
        <Route path={routesPaths.home} element={<Home />} />
        <Route path={routesPaths.projects} element={<ProjectsList />} />
        <Route path={routesPaths.projectDetails} element={<ProjectDetails />} />
        <Route path={routesPaths.about} element={<About />} />
        <Route path={routesPaths.contacts} element={<Contacts />} />
        <Route path={routesPaths.policy} element={<Policy />} />
        <Route path={routesPaths.notFound} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
