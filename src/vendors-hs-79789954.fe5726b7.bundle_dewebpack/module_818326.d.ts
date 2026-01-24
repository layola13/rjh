/**
 * 错误代码和消息的结构
 */
export interface ErrorInfo {
  /** 错误代码 */
  code: string;
  /** 错误消息 */
  message: string;
}

/**
 * MTOP 响应的基础结构
 */
export interface MtopResponse<T = unknown> {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data?: T;
}

/**
 * 带有 result 字段的数据结构
 */
export interface ResultWrapper<T = unknown> {
  /** 实际结果数据 */
  result?: T;
}

/**
 * AI 替换内容提交的参数
 */
export interface SubmitAIReplaceContentsParams {
  [key: string]: unknown;
}

/**
 * AI 替换内容查询的参数
 */
export interface QueryAIReplaceContentsParams {
  [key: string]: unknown;
}

/**
 * MTOP 请求选项
 */
export interface MtopRequestOptions<T> {
  data: T;
}

/**
 * 全局 NWTK 命名空间
 */
declare global {
  const NWTK: {
    mtop: {
      ConstraintLayout: {
        submitAIReplaceContents<T>(
          options: MtopRequestOptions<T>
        ): Promise<MtopResponse>;
        queryAIReplaceContents<T>(
          options: MtopRequestOptions<T>
        ): Promise<MtopResponse>;
      };
    };
  };
}

/**
 * 处理 MTOP 错误响应，解析错误代码和消息
 * @param response - MTOP 响应对象
 * @returns 错误信息数组，如果没有错误返回 undefined
 * @example
 * const errors = handleMtopError({ ret: ['ERROR::服务异常'] });
 * // => [{ code: 'ERROR', message: '服务异常' }]
 */
export function handleMtopError(
  response: MtopResponse
): ErrorInfo[] | undefined;

/**
 * 处理 MTOP 结果，验证成功状态并提取数据
 * @param response - MTOP 响应对象
 * @returns 提取的结果数据
 * @throws {ErrorInfo[]} 当响应无数据或不包含成功状态时抛出错误信息
 * @example
 * const data = handleMtopResult({ ret: ['SUCCESS'], data: { result: { id: 1 } } });
 * // => { id: 1 }
 */
export function handleMtopResult<T = unknown>(response: MtopResponse<T>): T;

/**
 * 提交 AI 替换内容
 * @param params - 提交参数
 * @returns 处理后的响应数据
 * @throws {ErrorInfo[]} 当请求失败时抛出错误信息
 */
export function submitAIReplaceContents<T = unknown>(
  params: SubmitAIReplaceContentsParams
): Promise<T>;

/**
 * 查询 AI 替换内容
 * @param params - 查询参数
 * @returns 处理后的响应数据
 * @throws {ErrorInfo[]} 当请求失败时抛出错误信息
 */
export function queryAIReplaceContents<T = unknown>(
  params: QueryAIReplaceContentsParams
): Promise<T>;