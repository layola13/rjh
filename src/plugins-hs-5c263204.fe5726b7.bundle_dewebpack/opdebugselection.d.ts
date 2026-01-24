/**
 * OpDebugSelection - 用于调试和测试用户选择功能的操作类
 * 
 * 此操作类用于测试系统的用户选择对话框功能，会连续触发两次选择对话框，
 * 模拟需要用户进行多次选择的场景。
 * 
 * @module OpDebugSelection
 */

import { OperationId, BaseOperation } from './base-operation';

/**
 * 选择项接口
 * 定义用户可选择的单个选项
 */
export interface SelectionOption {
  /** 选项索引 */
  index: number;
  /** 显示给用户的选项标签 */
  label: string;
}

/**
 * 操作执行上下文
 * 包含操作执行时的请求和响应信息
 */
export interface OperationContext {
  /** 响应对象,用于向用户返回结果 */
  reply: unknown;
  /** 其他上下文属性 */
  [key: string]: unknown;
}

/**
 * 用户选择完成后的回调函数类型
 */
export type SelectionCallback = (selectedOption: SelectionOption) => void;

/**
 * 模拟消息对象接口
 * 用于创建测试用的操作消息
 */
export interface MockMessage {
  /** 操作类型标识 */
  operationType: OperationId;
  /** 其他消息属性 */
  [key: string]: unknown;
}

/**
 * OpDebugSelection 调试选择操作类
 * 
 * 继承自 BaseOperation，用于测试系统的用户选择交互功能。
 * 该操作会依次展示两个选择对话框，用于验证选择流程的正确性。
 * 
 * @extends BaseOperation
 * 
 * @example
 *