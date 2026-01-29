const post = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<T> => A.post<T>(url, data, config);

export default post;

interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, any>;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  withCredentials?: boolean;
}