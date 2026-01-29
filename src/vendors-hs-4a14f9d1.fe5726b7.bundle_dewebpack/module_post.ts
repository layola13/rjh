const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig
): Promise<T> => A.post<T>(url, data, config);

export default post;

interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, unknown>;
  signal?: AbortSignal;
}