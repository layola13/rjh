/**
 * Axios HTTP客户端库的类型定义
 * 提供基于Promise的HTTP客户端，用于浏览器和Node.js环境
 */

/**
 * Axios请求配置接口
 */
export interface AxiosRequestConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  [key: string]: unknown;
}

/**
 * Axios响应接口
 */
export interface AxiosResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
  request?: unknown;
}

/**
 * Axios错误接口
 */
export interface AxiosError<T = unknown> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: unknown;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
}

/**
 * 请求拦截器管理器
 */
export interface AxiosInterceptorManager<V> {
  use(
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: unknown) => unknown
  ): number;
  eject(id: number): void;
}

/**
 * Axios实例接口
 */
export interface AxiosInstance {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
  (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  
  request<T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  options<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

/**
 * Axios静态接口
 */
export interface AxiosStatic extends AxiosInstance {
  /**
   * Axios构造函数
   */
  Axios: new (config: AxiosRequestConfig) => AxiosInstance;
  
  /**
   * 创建新的Axios实例
   * @param config - 实例配置对象
   * @returns 新的Axios实例
   */
  create(config?: AxiosRequestConfig): AxiosInstance;
  
  /**
   * 取消令牌类
   */
  CancelToken: CancelTokenStatic;
  
  /**
   * 取消类
   */
  Cancel: CancelStatic;
  
  /**
   * 判断错误是否为取消错误
   * @param value - 要检查的值
   * @returns 如果是取消错误返回true
   */
  isCancel(value: unknown): boolean;
  
  /**
   * 并发执行多个请求
   * @param promises - Promise数组
   * @returns 所有Promise的结果
   */
  all<T>(promises: Array<Promise<T>>): Promise<T[]>;
  
  /**
   * 将响应数组展开为多个参数
   * @param callback - 回调函数
   * @returns 展开后的函数
   */
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}

/**
 * 取消令牌静态接口
 */
export interface CancelTokenStatic {
  new (executor: (cancel: Canceler) => void): CancelToken;
  source(): CancelTokenSource;
}

/**
 * 取消令牌接口
 */
export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

/**
 * 取消令牌源接口
 */
export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}

/**
 * 取消函数类型
 */
export type Canceler = (message?: string) => void;

/**
 * 取消类静态接口
 */
export interface CancelStatic {
  new (message?: string): Cancel;
}

/**
 * 取消接口
 */
export interface Cancel {
  message: string;
}

/**
 * 默认Axios实例
 */
declare const axios: AxiosStatic;

export default axios;