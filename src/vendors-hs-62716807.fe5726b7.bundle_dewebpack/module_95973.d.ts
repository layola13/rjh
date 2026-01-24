/**
 * HTTP响应状态验证处理器
 * 根据配置的validateStatus函数验证响应状态码，决定resolve或reject Promise
 */

/**
 * HTTP请求配置接口
 */
interface RequestConfig {
  /** HTTP状态码验证函数，返回true表示成功 */
  validateStatus?: (status: number) => boolean;
  [key: string]: unknown;
}

/**
 * HTTP响应对象接口
 */
interface HttpResponse<T = unknown> {
  /** HTTP状态码 */
  status: number;
  /** 响应配置 */
  config: RequestConfig;
  /** 响应数据 */
  data?: T;
  /** 原始请求对象 */
  request?: unknown;
  [key: string]: unknown;
}

/**
 * 错误工厂函数类型
 * @param message - 错误消息
 * @param config - 请求配置
 * @param code - 错误代码
 * @param request - 原始请求对象
 * @param response - HTTP响应对象
 * @returns 错误对象
 */
type CreateErrorFunction = (
  message: string,
  config: RequestConfig,
  code: string | null,
  request: unknown,
  response: HttpResponse
) => Error;

/**
 * Promise resolve回调类型
 */
type ResolveFunction<T = HttpResponse> = (value: T) => void;

/**
 * Promise reject回调类型
 */
type RejectFunction = (error: Error) => void;

/**
 * 处理HTTP响应的状态验证
 * 如果状态码通过验证则resolve Promise，否则reject并创建错误
 * 
 * @param resolve - Promise的resolve函数
 * @param reject - Promise的reject函数
 * @param response - HTTP响应对象
 * @param createError - 错误创建函数
 */
declare function handleResponseStatusValidation(
  resolve: ResolveFunction,
  reject: RejectFunction,
  response: HttpResponse,
  createError: CreateErrorFunction
): void;

export = handleResponseStatusValidation;