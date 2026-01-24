/**
 * HTTP PUT请求配置接口
 * @description 定义PUT请求所需的配置选项
 */
interface PutRequestConfig {
  /** 请求方法，固定为 "put" */
  method: 'put';
  /** 请求的URL地址 */
  url: string;
  /** 请求体数据 */
  data: unknown;
}

/**
 * HTTP响应数据接口
 * @description 定义HTTP响应的基本结构
 */
interface HttpResponse<T = unknown> {
  /** 响应状态码 */
  status: number;
  /** 响应状态文本 */
  statusText: string;
  /** 响应数据 */
  data: T;
  /** 响应头信息 */
  headers: Record<string, string>;
}

/**
 * 执行HTTP PUT请求
 * 
 * @description
 * 发送PUT请求到指定URL，用于更新服务器上的资源。
 * 该函数封装了底层HTTP客户端（可能是axios），提供简化的PUT操作接口。
 * 
 * @template TResponse - 响应数据的类型，默认为unknown
 * 
 * @param url - 请求的目标URL地址
 * @param data - 要发送的请求体数据，通常是要更新的资源内容
 * 
 * @returns Promise<TResponse> - 返回Promise，resolve时包含经过处理的响应数据
 * 
 * @throws {Error} 当请求失败时抛出错误
 * 
 * @example
 *