import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { routesPaths } from "./routesPaths";
import MainLayout from "../../../pages/main";

// Lazy-импорты страниц (code splitting по роутам)
const Home = lazy(() => import("../../../pages/home/Home"));
const ProjectsList = lazy(() => import("../../../pages/projects/ui/projects-list/ProjectsList"));
const ProjectDetails = lazy(() => import("../../../pages/project-details/ProjectDetails"));
const About = lazy(() => import("../../../pages/about/About"));
const Contacts = lazy(() => import("../../../pages/contacts/Contacts"));
const Policy = lazy(() => import("../../../pages/politics/Policy"));
const NotFound = lazy(() => import("../../../pages/not-found/NotFound"));

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading">Загрузка приложения...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routesPaths.home} element={<Home />} />
          <Route path={routesPaths.projects} element={<ProjectsList />} />
          <Route
            path={routesPaths.projectDetails}
            element={<ProjectDetails />}
          />
          <Route path={routesPaths.about} element={<About />} />
          <Route path={routesPaths.contacts} element={<Contacts />} />
          <Route path={routesPaths.policy} element={<Policy />} />
          <Route path={routesPaths.notFound} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
