/**
 * HTTP响应数据接口
 * @template T 响应数据的类型
 */
interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * HTTP请求配置接口
 */
interface RequestConfig<D = unknown> {
  method: string;
  url: string;
  data?: D;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * 执行HTTP DELETE请求
 * 
 * @template TData - 请求体数据类型
 * @template TResponse - 响应数据类型
 * 
 * @param url - 请求的目标URL地址
 * @param data - 可选的请求体数据，将在DELETE请求中发送
 * 
 * @returns Promise<TResponse> - 返回经过处理后的响应数据
 * 
 * @example
 *