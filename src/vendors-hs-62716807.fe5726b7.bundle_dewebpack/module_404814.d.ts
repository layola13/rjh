/**
 * Axios错误增强函数
 * 为错误对象添加Axios特定的属性和方法
 */

/**
 * Axios请求配置接口
 */
interface AxiosRequestConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: unknown;
  data?: unknown;
  timeout?: number;
  [key: string]: unknown;
}

/**
 * Axios响应接口
 */
interface AxiosResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
  request?: unknown;
}

/**
 * 错误JSON序列化结果接口
 */
interface ErrorJSON {
  /** 错误消息 */
  message: string;
  /** 错误名称 */
  name: string;
  /** 错误描述 */
  description?: string;
  /** 错误编号 */
  number?: number;
  /** 发生错误的文件名 */
  fileName?: string;
  /** 发生错误的行号 */
  lineNumber?: number;
  /** 发生错误的列号 */
  columnNumber?: number;
  /** 错误堆栈跟踪 */
  stack?: string;
  /** Axios请求配置 */
  config?: AxiosRequestConfig;
  /** 错误代码 */
  code?: string;
}

/**
 * Axios错误接口
 * 扩展标准Error对象，添加Axios特定的属性
 */
interface AxiosError<T = unknown> extends Error {
  /** 请求配置 */
  config?: AxiosRequestConfig;
  /** 错误代码（如ECONNABORTED, ERR_NETWORK等） */
  code?: string;
  /** 请求对象 */
  request?: unknown;
  /** 响应对象 */
  response?: AxiosResponse<T>;
  /** 标识是否为Axios错误 */
  isAxiosError: boolean;
  /** 将错误序列化为JSON对象 */
  toJSON(): ErrorJSON;
}

/**
 * 增强错误对象，添加Axios特定的属性和方法
 * 
 * @param error - 原始错误对象
 * @param config - Axios请求配置
 * @param code - 错误代码（可选）
 * @param request - 请求对象（可选）
 * @param response - 响应对象（可选）
 * @returns 增强后的Axios错误对象
 */
declare function enhanceAxiosError<T = unknown>(
  error: Error,
  config: AxiosRequestConfig,
  code?: string,
  request?: unknown,
  response?: AxiosResponse<T>
): AxiosError<T>;

export = enhanceAxiosError;