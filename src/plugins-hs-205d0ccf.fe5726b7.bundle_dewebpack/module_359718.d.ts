/**
 * 设计保存扩展服务模块
 * 提供设计保存的扩展点注册和执行功能
 */

/**
 * 保存设计的参数类型
 */
export interface SaveDesignExtendParams {
  /** 设计数据 */
  designData?: unknown;
  /** 扩展配置 */
  options?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * 保存设计扩展服务的回调函数类型
 */
export type SaveDesignExtendCallback = (params: SaveDesignExtendParams) => Promise<unknown> | unknown;

/**
 * 执行保存设计扩展服务
 * 
 * @param params - 保存设计的参数对象
 * @returns Promise，返回扩展服务的执行结果
 * 
 * @example
 *