export const routesPaths = {
  home: "/",
  projects: "/projects",
  projectDetails: "/projects/:slug",
  about: "/about",
  contacts: "/contacts",
  policy: "/policy",
  notFound: "*",
} as const;

export type RoutePath = (typeof routesPaths)[keyof typeof routesPaths];
