import type {
  IApiClientConfig,
  IApiError,
  IRequestOptions,
} from "../types/api.types";

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

const isJsonContentType = (contentType: string | null): boolean => {
  return contentType?.includes("application/json") ?? false;
};

const safeParseJson = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get("content-type");

  if (!isJsonContentType(contentType)) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const createApiClient = (config: IApiClientConfig) => {
  const { baseUrl, getLanguage } = config;

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
    const { method = "GET", body, headers = {}, params, signal } = options;

    const url = buildUrl(path, params);
    const language = getLanguage();

    const requestHeaders: HeadersInit = {
      "Accept-Language": language,
      ...headers,
    };
    if (body !== undefined) {
      requestHeaders["Content-Type"] = "application/json";
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: "include",
      signal,
    };

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (response.status === 204 || response.status === 205) {
      return {} as T;
    }

    const data = await safeParseJson(response);

    if (!response.ok) {
      const errorData = data as IApiError;
      throw new ApiError(
        errorData?.status || response.status,
        errorData?.code || "UNKNOWN_ERROR",
        errorData?.message || "Произошла ошибка при выполнении запроса",
      );
    }

    return data as T;
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
