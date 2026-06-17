import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths";
import MainLayout from "@pages/main";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";

// Lazy-импорты страниц (code splitting по роутам)
const Home = lazy(() => import("@pages/home"));
const ProjectsPage = lazy(() => import("@pages/projects"));
const ProjectDetails = lazy(() => import("@pages/project-details"));
const About = lazy(() => import("@pages/about"));
const Contacts = lazy(() => import("@/pages/contacts"));
const Policy = lazy(() => import("@pages/politics"));
const NotFound = lazy(() => import("@pages/not-found"));

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading">Загрузка приложения...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Оборачиваем каждый маршрут в ErrorBoundary */}
          <Route
            path={routesPaths.home}
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route
            path={routesPaths.projects}
            element={
              <ErrorBoundary>
                <ProjectsPage />
              </ErrorBoundary>
            }
          />
          <Route
            path={routesPaths.projectDetails}
            element={
              <ErrorBoundary>
                <ProjectDetails />
              </ErrorBoundary>
            }
          />
          <Route
            path={routesPaths.about}
            element={
              <ErrorBoundary>
                <About />
              </ErrorBoundary>
            }
          />
          <Route
            path={routesPaths.contacts}
            element={
              <ErrorBoundary>
                <Contacts />
              </ErrorBoundary>
            }
          />
          <Route
            path={routesPaths.policy}
            element={
              <ErrorBoundary>
                <Policy />
              </ErrorBoundary>
            }
          />
          <Route
            path={routesPaths.notFound}
            element={
              <ErrorBoundary>
                <NotFound />
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};
