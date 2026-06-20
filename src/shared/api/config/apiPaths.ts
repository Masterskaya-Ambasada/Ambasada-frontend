export const apiPaths = {
  about: "/about/",

  auth: {
    login: "/auth/login/",
    refreshToken: "/auth/token/refresh/",
  },
  contact: {
    get: "/contact/",
    create: "/contact/",
  },
  home: "/home/",

  init: "/init/",

  politics: "/politics/",

  projects: {
    list: "/projects/",
    details: (slug: string) => `/projects/${slug}/`,
    categories: "/projects/categories/",
    tags: "/projects/tags/",
  },

  users: {
    team: "/users/team/",
  },
} as const;

export type ApiPath = typeof apiPaths;

export type ProjectSlugParam = {
  slug: string;
};
