import { http, HttpResponse } from "msw";
import projects from "../fixtures/projects/projects.json";
import categories from "../fixtures/projects/categories.json";
import tags from "../fixtures/projects/tags.json";

export const projectHandlers = [
  // GET /projects
  http.get("/api/v1/projects", () => {
    return HttpResponse.json(projects);
  }),

  // GET /projects/categories
  http.get("/api/v1/projects/categories", () => {
    return HttpResponse.json(categories);
  }),

  // GET /projects/predefined-categories
  http.get("/api/v1/projects/predefined-categories", () => {
    return HttpResponse.json(categories);
  }),

  // GET /projects/tags
  http.get("/api/v1/projects/tags", () => {
    return HttpResponse.json(tags);
  }),

  // GET /projects/:id
  http.get("/api/v1/projects/:id", ({ params }) => {
    const project = projects.items.find((p) => p.id === params.id);

    if (!project) {
      return HttpResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(project);
  }),
];
