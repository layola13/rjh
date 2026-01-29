/**
 * Module: module_onClick
 * Original ID: onClick
 * 
 * 处理点击快捷标签输入的回调函数
 */

/**
 * 操作ID枚举类型
 */
declare enum OperationId {
  ImageTo3DModel = "ImageTo3DModel",
  // ... 其他操作ID
}

/**
 * 点击事件处理函数的参数接口
 */
interface OnClickParams {
  /** 标签的键值 */
  key: string;
  /** 标签的名称 */
  name: string;
  /** 操作ID */
  operationId: OperationId;
  /** 额外的状态标志 */
  additionalFlag?: boolean;
}

/**
 * 点击快捷标签的事件处理函数
 * 
 * @param key - 标签的键值
 * @param name - 标签的名称  
 * @param operationId - 操作类型ID
 * @param additionalFlag - 额外的状态标志
 * @returns void
 */
declare function onClick(
  key: string,
  name: string,
  operationId: OperationId,
  additionalFlag?: boolean
): void;

/**
 * 检查是否满足特定条件
 */
declare function Qe(value: unknown): boolean;

/**
 * 设置状态的函数
 */
declare function et(flag: boolean, message: string): void;

/**
 * 执行主要操作的函数
 */
declare function Je(name: string, payload: unknown): void;

/**
 * 工具函数命名空间
 */
declare namespace v {
  /** 显示AI建模器弹窗 */
  function bugAIModelerPopup(): void;
  
  /** 记录追踪日志 */
  function trackLog(
    category: string,
    action: string,
    data: Record<string, unknown>
  ): void;
}

export { onClick, OnClickParams, OperationId };