import type { IApiError } from "./types";

type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface IRequestOptions {
  method?: THttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | undefined>;
}

export class ApiError extends Error {
  public status: number;
  public code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

type TGetLanguage = () => string;

interface IApiClientConfig {
  baseUrl: string;
  getLanguage: TGetLanguage;
  onUnauthorized?: () => void;
}

export const createApiClient = (config: IApiClientConfig) => {
  const { baseUrl, getLanguage, onUnauthorized } = config;

  const buildUrl = (
    path: string,
    params?: Record<string, string | number | undefined>,
  ): string => {
    const url = new URL(`${baseUrl}${path}`, window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  };

  const request = async <T>(
    path: string,
    options: IRequestOptions = {},
  ): Promise<T> => {
    const { method = "GET", body, headers = {}, params } = options;

    const url = buildUrl(path, params);
    const language = getLanguage();

    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      "Accept-Language": language,
      ...headers,
    };

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: "include",
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, requestOptions);

      if (response.status === 401 && onUnauthorized) {
        onUnauthorized();
      }

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as IApiError;
        throw new ApiError(
          errorData.status || response.status,
          errorData.code || "UNKNOWN_ERROR",
          errorData.message || "Произошла ошибка при выполнении запроса",
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        0,
        "NETWORK_ERROR",
        "Ошибка сети. Проверьте подключение к интернету.",
      );
    }
  };

  return {
    get: <T>(
      path: string,
      options?: Omit<IRequestOptions, "method" | "body">,
    ) => request<T>(path, { ...options, method: "GET" }),

    post: <T>(
      path: string,
      body?: unknown,
      options?: Omit<IRequestOptions, "method" | "body">,
    ) => request<T>(path, { ...options, method: "POST", body }),

    put: <T>(
      path: string,
      body?: unknown,
      options?: Omit<IRequestOptions, "method" | "body">,
    ) => request<T>(path, { ...options, method: "PUT", body }),

    delete: <T>(
      path: string,
      options?: Omit<IRequestOptions, "method" | "body">,
    ) => request<T>(path, { ...options, method: "DELETE" }),

    patch: <T>(
      path: string,
      body?: unknown,
      options?: Omit<IRequestOptions, "method" | "body">,
    ) => request<T>(path, { ...options, method: "PATCH", body }),
  };
};

export type TApiClient = ReturnType<typeof createApiClient>;
