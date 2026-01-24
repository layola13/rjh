/**
 * HTTP 请求配置选项
 */
interface RequestOptions {
  /** 请求头信息 */
  headers?: Record<string, string>;
  /** XHR 字段配置 */
  xhrFields?: {
    /** 是否携带跨域凭证 */
    withCredentials: boolean;
  };
  /** 内容类型 */
  contentType?: string | false;
  /** 数据类型 */
  dataType?: string;
  /** 请求超时时间(毫秒) */
  timeout?: number;
  /** 上传进度回调 */
  uploadProgress?: (event: ProgressEvent) => void;
  /** 其他 jQuery.ajax 兼容选项 */
  [key: string]: any;
}

/**
 * 增强的错误对象，包含 HTTP 状态信息
 */
interface HttpError extends String {
  /** XHR readyState 状态码 */
  readyState: number;
  /** HTTP 状态码 */
  status: number;
}

/**
 * 可中止的 Promise
 */
interface AbortablePromise<T> extends Promise<T> {
  /** 中止请求 */
  abort(): void;
}

/**
 * HTTP 错误处理函数
 * @param xhr - XMLHttpRequest 对象
 * @param textStatus - 错误状态文本
 * @param errorThrown - 抛出的错误
 */
type ErrorHandler = (
  xhr: XMLHttpRequest,
  textStatus: string,
  errorThrown: string
) => void;

/**
 * HTTP 请求工具模块
 * 提供 RESTful API 请求方法，支持跨域凭证、API 签名和错误处理
 */
declare module HttpClient {
  /**
   * 发送 GET 请求
   * @param url - 请求 URL
   * @param options - 请求配置选项
   * @returns Promise，resolve 返回响应数据
   */
  function get<T = any>(url: string, options?: RequestOptions): Promise<T>;

  /**
   * 发送 POST 请求
   * @param url - 请求 URL
   * @param data - 请求体数据(自动序列化为 JSON)
   * @param options - 请求配置选项
   * @returns 可中止的 Promise，resolve 返回响应数据
   */
  function post<T = any>(
    url: string,
    data: any,
    options?: RequestOptions
  ): AbortablePromise<T>;

  /**
   * 发送 PUT 请求
   * @param url - 请求 URL
   * @param data - 请求体数据(自动序列化为 JSON)
   * @param options - 请求配置选项
   * @returns Promise，resolve 返回响应数据
   */
  function put<T = any>(
    url: string,
    data: any,
    options?: RequestOptions
  ): Promise<T>;

  /**
   * 发送 DELETE 请求
   * @param url - 请求 URL
   * @param options - 请求配置选项
   * @returns Promise，resolve 返回响应数据
   */
  function remove<T = any>(url: string, options?: RequestOptions): Promise<T>;

  /**
   * 发送 PATCH 请求
   * @param url - 请求 URL
   * @param data - 请求体数据(自动序列化为 JSON)
   * @param options - 请求配置选项
   * @returns Promise，resolve 返回响应数据
   */
  function patch<T = any>(
    url: string,
    data: any,
    options?: RequestOptions
  ): Promise<T>;

  /**
   * 注册全局错误处理器
   * @param handler - 错误处理函数
   */
  function registerErrorHandler(handler: ErrorHandler): void;

  /**
   * 注销所有已注册的错误处理器
   */
  function unRegisterAllErrorHandlers(): void;
}

export = HttpClient;