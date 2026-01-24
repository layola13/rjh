/**
 * Axios核心类定义文件
 * 提供HTTP请求的统一接口和拦截器机制
 */

/**
 * 请求拦截器处理函数
 */
export interface RequestFulfilledHandler<T = any> {
  (value: T): T | Promise<T>;
}

/**
 * 请求拦截器错误处理函数
 */
export interface RequestRejectedHandler {
  (error: any): any;
}

/**
 * 响应拦截器处理函数
 */
export interface ResponseFulfilledHandler<T = any> {
  (value: T): T | Promise<T>;
}

/**
 * 响应拦截器错误处理函数
 */
export interface ResponseRejectedHandler {
  (error: any): any;
}

/**
 * 拦截器管理器接口
 */
export interface InterceptorManager<T> {
  /**
   * 添加拦截器
   * @param fulfilled 成功处理函数
   * @param rejected 失败处理函数
   * @returns 拦截器ID
   */
  use(fulfilled: (value: T) => T | Promise<T>, rejected?: (error: any) => any): number;
  
  /**
   * 移除拦截器
   * @param id 拦截器ID
   */
  eject(id: number): void;
  
  /**
   * 遍历所有拦截器
   * @param fn 回调函数
   */
  forEach(fn: (interceptor: { fulfilled: Function; rejected: Function }) => void): void;
}

/**
 * HTTP请求方法类型
 */
export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

/**
 * 参数序列化函数类型
 */
export type ParamsSerializer = (params: any) => string;

/**
 * 请求配置接口
 */
export interface AxiosRequestConfig {
  /** 请求URL */
  url?: string;
  /** 请求方法 */
  method?: Method | string;
  /** 请求数据 */
  data?: any;
  /** URL查询参数 */
  params?: any;
  /** 参数序列化器 */
  paramsSerializer?: ParamsSerializer;
  /** 请求头 */
  headers?: Record<string, any>;
  /** 超时时间 */
  timeout?: number;
  /** 其他配置项 */
  [key: string]: any;
}

/**
 * 响应数据接口
 */
export interface AxiosResponse<T = any> {
  /** 响应数据 */
  data: T;
  /** HTTP状态码 */
  status: number;
  /** 状态文本 */
  statusText: string;
  /** 响应头 */
  headers: Record<string, any>;
  /** 请求配置 */
  config: AxiosRequestConfig;
  /** 原始请求对象 */
  request?: any;
}

/**
 * Promise类型的响应
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * 拦截器集合接口
 */
export interface AxiosInterceptors {
  /** 请求拦截器 */
  request: InterceptorManager<AxiosRequestConfig>;
  /** 响应拦截器 */
  response: InterceptorManager<AxiosResponse>;
}

/**
 * Axios核心类
 * 负责HTTP请求的发送、配置管理和拦截器处理
 */
export default class Axios {
  /** 默认配置 */
  defaults: AxiosRequestConfig;
  
  /** 拦截器集合 */
  interceptors: AxiosInterceptors;

  /**
   * 构造函数
   * @param defaultConfig 默认配置对象
   */
  constructor(defaultConfig: AxiosRequestConfig);

  /**
   * 发送HTTP请求
   * @param config 请求配置
   * @returns Promise对象
   */
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  
  /**
   * 发送HTTP请求（URL字符串重载）
   * @param url 请求URL
   * @param config 请求配置
   * @returns Promise对象
   */
  request<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  /**
   * 获取完整的请求URI
   * @param config 请求配置
   * @returns 格式化后的URI字符串
   */
  getUri(config?: AxiosRequestConfig): string;

  /**
   * 发送DELETE请求
   * @param url 请求URL
   * @param config 请求配置
   * @returns Promise对象
   */
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  /**
   * 发送GET请求
   * @param url 请求URL
   * @param config 请求配置
   * @returns Promise对象
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  /**
   * 发送HEAD请求
   * @param url 请求URL
   * @param config 请求配置
   * @returns Promise对象
   */
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  /**
   * 发送OPTIONS请求
   * @param url 请求URL
   * @param config 请求配置
   * @returns Promise对象
   */
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  /**
   * 发送POST请求
   * @param url 请求URL
   * @param data 请求体数据
   * @param config 请求配置
   * @returns Promise对象
   */
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  /**
   * 发送PUT请求
   * @param url 请求URL
   * @param data 请求体数据
   * @param config 请求配置
   * @returns Promise对象
   */
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  /**
   * 发送PATCH请求
   * @param url 请求URL
   * @param data 请求体数据
   * @param config 请求配置
   * @returns Promise对象
   */
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}