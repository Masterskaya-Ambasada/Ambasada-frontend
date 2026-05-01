import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths";
import MainLayout from "@pages/main";

// Lazy-импорты страниц (code splitting по роутам)
const Home = lazy(() => import("@pages/home"));
const ProjectsPage = lazy(() => import("@pages/projects"));
const ProjectDetails = lazy(() => import("@pages/project-details"));
const About = lazy(() => import("@pages/about"));
const Contacts = lazy(() => import("@pages/contacts"));
const Policy = lazy(() => import("@pages/politics"));
const NotFound = lazy(() => import("@pages/not-found"));


export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading">Загрузка приложения...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routesPaths.home} element={<Home />} />
          <Route path={routesPaths.projects} element={<ProjectsPage />} />
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
