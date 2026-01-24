/**
 * 处理请求数据中的特殊Unicode字符（表情符号）
 * 
 * 该模块用于在发送请求前转义4字节Unicode字符（如emoji），
 * 并在收到特定错误响应时重试请求流程。
 */

/**
 * 请求选项配置
 */
interface RequestOptions {
  /** 响应的JSON数据 */
  retJson: {
    /** 返回码，可能是数组或其他类型 */
    ret: string | string[] | unknown;
  };
}

/**
 * 请求参数
 */
interface RequestParams {
  /** 请求数据，可能包含需要转义的特殊字符 */
  data?: string | Record<string, unknown>;
}

/**
 * 请求上下文，包含中间件和处理方法
 */
interface RequestContext {
  /** 请求配置选项 */
  options: RequestOptions;
  
  /** 请求参数 */
  params: RequestParams;
  
  /** 要发送的数据 */
  sendData?: string | Record<string, unknown>;
  
  /** 处理token的中间件 */
  __processToken: MiddlewareFunction;
  
  /** 处理请求URL的中间件 */
  __processRequestUrl: MiddlewareFunction;
  
  /** 其他中间件列表 */
  middlewares: MiddlewareFunction[];
  
  /** 处理最终请求的方法 */
  __processRequest: MiddlewareFunction;
  
  /**
   * 按序执行中间件数组
   * @param middlewares - 要执行的中间件数组
   * @returns Promise，表示执行结果
   */
  __sequence(middlewares: MiddlewareFunction[]): Promise<void>;
}

/**
 * 中间件函数类型
 */
type MiddlewareFunction = () => Promise<void> | void;

/**
 * 主处理函数类型
 * @returns Promise，表示请求执行结果
 */
type RequestExecutor = () => Promise<void>;

/**
 * 转义字符串中的4字节Unicode字符（如emoji表情）
 * 
 * @param value - 要处理的值，可以是字符串或对象
 * @returns 转义后的字符串
 * 
 * @example
 * escapeUnicodeCharacters("Hello 😀") 
 * // 返回: "Hello \\ud83d\\ude00"
 */
declare function escapeUnicodeCharacters(
  value: string | Record<string, unknown>
): string;

/**
 * 处理请求数据并在需要时重试
 * 
 * 该函数会：
 * 1. 转义请求参数和发送数据中的特殊Unicode字符
 * 2. 执行请求
 * 3. 检查响应中是否包含 FAIL_SYS_ILLEGAL_ACCESS 错误
 * 4. 如果检测到该错误，重新执行完整的请求流程
 * 
 * @param this - 请求上下文对象
 * @param executor - 执行实际请求的函数
 * @returns Promise，表示处理结果
 */
declare function processRequestWithUnicodeHandling(
  this: RequestContext,
  executor: RequestExecutor
): Promise<void>;

/**
 * 默认导出：请求数据处理中间件
 * 
 * 用于拦截和处理包含特殊Unicode字符的请求数据，
 * 防止因emoji等4字节字符导致的 ILLEGAL_ACCESS 错误
 */
export default processRequestWithUnicodeHandling;

export { escapeUnicodeCharacters, processRequestWithUnicodeHandling };