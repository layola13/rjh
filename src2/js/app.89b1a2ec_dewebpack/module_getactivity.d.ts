/**
 * 获取活动信息的API调用函数
 * @description 向思客公园服务端发起GET请求获取活动数据
 * @module ActivityAPI
 */

/**
 * Axios实例配置接口
 */
interface AxiosInstanceConfig {
  /** API基础URL */
  baseURL: string;
}

/**
 * Axios请求头配置
 */
interface AxiosHeaders {
  /** 通用请求头 */
  common: Record<string, string>;
}

/**
 * Axios默认配置
 */
interface AxiosDefaults {
  /** 请求头配置 */
  headers: AxiosHeaders;
}

/**
 * Axios实例接口
 */
interface AxiosInstance {
  /** 默认配置 */
  defaults: AxiosDefaults;
  /**
   * 发起GET请求
   * @param url - 请求的URL路径
   * @returns Promise包装的响应数据
   */
  get<T = unknown>(url: string): Promise<T>;
}

/**
 * Axios创建器接口
 */
interface AxiosStatic {
  /**
   * 创建Axios实例
   * @param config - 实例配置选项
   * @returns 新的Axios实例
   */
  create(config: AxiosInstanceConfig): AxiosInstance;
}

/**
 * 获取活动信息
 * @param endpoint - API端点路径（相对于baseURL）
 * @returns Promise包装的活动数据
 * @example
 *