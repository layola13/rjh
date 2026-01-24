/**
 * 文件上传请求的配置选项
 */
export interface UploadRequestOptions {
  /** 上传的目标URL */
  action: string;
  /** HTTP请求方法，通常为 'POST' */
  method: string;
  /** 要上传的文件对象 */
  file: Blob | File;
  /** 文件在FormData中的字段名 */
  filename: string;
  /** 附加的表单数据 */
  data?: Record<string, string | number | boolean | Array<string | number | boolean>>;
  /** 自定义请求头 */
  headers?: Record<string, string | null>;
  /** 是否携带凭证（cookies等） */
  withCredentials?: boolean;
  /** 上传进度回调 */
  onProgress?: (event: UploadProgressEvent) => void;
  /** 上传成功回调 */
  onSuccess: (response: unknown, xhr: XMLHttpRequest) => void;
  /** 上传失败回调 */
  onError: (error: Error, response?: unknown) => void;
}

/**
 * 上传进度事件
 */
export interface UploadProgressEvent extends ProgressEvent {
  /** 上传进度百分比 (0-100) */
  percent?: number;
}

/**
 * 上传请求返回的控制对象
 */
export interface UploadRequestHandler {
  /** 中止上传请求 */
  abort: () => void;
}

/**
 * 自定义上传错误
 */
export interface UploadError extends Error {
  /** HTTP状态码 */
  status?: number;
  /** 请求方法 */
  method?: string;
  /** 请求URL */
  url?: string;
}

/**
 * 解析XMLHttpRequest响应体为JSON或文本
 * @param xhr - XMLHttpRequest实例
 * @returns 解析后的响应数据
 */
declare function parseResponse(xhr: XMLHttpRequest): unknown;

/**
 * 创建上传错误对象
 * @param options - 上传配置选项
 * @param xhr - XMLHttpRequest实例
 * @returns 包含详细信息的错误对象
 */
declare function createUploadError(
  options: UploadRequestOptions,
  xhr: XMLHttpRequest
): UploadError;

/**
 * 执行文件上传请求
 * 
 * 使用XMLHttpRequest实现文件上传，支持：
 * - 上传进度监听
 * - 自定义请求头
 * - 携带额外表单数据
 * - 凭证传递
 * - 请求中止
 * 
 * @param options - 上传请求配置选项
 * @returns 返回包含abort方法的控制对象
 * 
 * @example
 *