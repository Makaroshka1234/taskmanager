const BASE_URL = "/api";

export const API_ROUTES = {
  task: {
    create: `${BASE_URL}/task/create/`,
    delete: (id: string | number) => `${BASE_URL}/task/${id}/`,
    update: (id: string | number) => `${BASE_URL}/task/update/${id}/`,
  },
  list: {
    create: `${BASE_URL}/list/create`,
    delete: `${BASE_URL}/task/delete`,
  },
  boards: {
    get: `${BASE_URL}/boards/`,
  },
} as const;
