/**
 * 活动数据获取模块
 * 用于从远程服务器获取活动相关信息
 */

/**
 * 获取活动数据的函数类型定义
 * @param endpoint - API端点路径或完整URL
 * @returns Promise，解析为活动数据响应
 */
declare function getActivity<T = unknown>(endpoint: string): Promise<AxiosResponse<T>>;

/**
 * Axios响应对象的类型定义
 */
interface AxiosResponse<T = unknown> {
  /** 响应数据 */
  data: T;
  /** HTTP状态码 */
  status: number;
  /** 状态文本 */
  statusText: string;
  /** 响应头 */
  headers: Record<string, string>;
  /** 请求配置 */
  config: AxiosRequestConfig;
  /** 原始请求对象 */
  request?: unknown;
}

/**
 * Axios请求配置类型定义
 */
interface AxiosRequestConfig {
  /** 基础URL */
  baseURL?: string;
  /** 请求头 */
  headers?: Record<string, string | number | boolean>;
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  /** 请求超时时间（毫秒） */
  timeout?: number;
  /** URL参数 */
  params?: Record<string, unknown>;
  /** 请求体数据 */
  data?: unknown;
}

/**
 * 模块导出
 */
export default getActivity;
export { getActivity, AxiosResponse, AxiosRequestConfig };