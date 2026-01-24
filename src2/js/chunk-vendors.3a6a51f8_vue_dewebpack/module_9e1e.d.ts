/**
 * 检测当前环境是否支持 Object.defineProperty 的 getter 功能
 * 
 * 该模块用于测试 ES5 的 Object.defineProperty 方法是否能正确工作。
 * 这是一个polyfill的常见检测模式，用于判断是否需要降级处理。
 * 
 * @module PropertyDescriptorSupport
 * @returns {boolean} 如果环境支持 Object.defineProperty 则返回 true，否则返回 false
 */

import type { ErrorDetector } from './79e5';

/**
 * 属性描述符接口
 */
interface PropertyDescriptor {
  /**
   * 属性的 getter 函数
   */
  get?(): unknown;
  
  /**
   * 属性的 setter 函数
   */
  set?(value: unknown): void;
  
  /**
   * 属性值
   */
  value?: unknown;
  
  /**
   * 是否可写
   */
  writable?: boolean;
  
  /**
   * 是否可枚举
   */
  enumerable?: boolean;
  
  /**
   * 是否可配置
   */
  configurable?: boolean;
}

/**
 * 检测 Object.defineProperty 是否支持 getter
 * 
 * 通过尝试定义一个带 getter 的属性并验证其返回值来判断功能是否可用。
 * 如果返回值不等于预期值(7)，则说明该功能不受支持或实现有问题。
 * 
 * @constant
 */
declare const supportsPropertyDescriptors: boolean;

export default supportsPropertyDescriptors;

/**
 * 用于类型推断的辅助类型
 */
export type PropertyDescriptorSupportResult = boolean;

/**
 * 测试对象接口
 */
interface TestObject {
  a?: number;
}