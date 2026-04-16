import { http, HttpResponse } from "msw";
import projects from "../fixtures/projects/projects.json";
import categories from "../fixtures/projects/categories.json";
import tags from "../fixtures/projects/tags.json";

export const projectHandlers = [
  // GET /projects (фильтрацией и пагинацией)
  http.get("/api/v1/projects", ({ request }) => {
    const url = new URL(request.url);

    const projectType = url.searchParams.get("project_type");
    const tag = url.searchParams.get("tag");
    const search = url.searchParams.get("search");

    const offset = Number(url.searchParams.get("offset")) || 0;
    const limit = Number(url.searchParams.get("limit")) || 10;

    let filtered = [...projects.items];

    // фильтр по типу проекта
    if (projectType) {
      filtered = filtered.filter(
        (p) => p.project_type.toLowerCase() === projectType.toLowerCase(),
      );
    }

    // фильтр по тегу
    if (tag) {
      filtered = filtered.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
      );
    }

    // поиск по названию
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // пагинация
    const paginated = filtered.slice(offset, offset + limit);

    return HttpResponse.json({
      items: paginated,
      pagination: {
        totalItems: filtered.length,
        offset,
        limit,
        isNext: offset + limit < filtered.length,
      },
    });
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
