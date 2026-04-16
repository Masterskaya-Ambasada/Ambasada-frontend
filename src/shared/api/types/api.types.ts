export interface IPagination {
  totalItems: number;
  offset: number;
  limit: number;
  isNext: boolean;
}

export interface IApiError {
  status: number;
  code: string;
  message: string;
}

export interface IRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | undefined>;
  signal?: AbortSignal;
}

export interface IApiClientConfig {
  baseUrl: string;
  getLanguage: () => string;
}
