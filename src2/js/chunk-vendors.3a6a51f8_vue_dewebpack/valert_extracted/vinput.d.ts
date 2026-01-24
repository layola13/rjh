/**
 * VInput 组件模块
 * 提供输入框组件的类型定义和导出
 * @module VInput
 */

/**
 * VInput 组件类
 * 用于创建和管理输入框组件的核心类
 */
export declare class VInput {
  /**
   * 构造函数
   * @param options - 组件配置选项
   */
  constructor(options?: VInputOptions);

  /**
   * 组件的值
   */
  value: string;

  /**
   * 渲染组件
   */
  render(): void;

  /**
   * 销毁组件
   */
  destroy(): void;
}

/**
 * VInput 组件配置选项
 */
export interface VInputOptions {
  /**
   * 初始值
   */
  value?: string;

  /**
   * 占位符文本
   */
  placeholder?: string;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 输入类型
   * @default 'text'
   */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';

  /**
   * 最大长度
   */
  maxLength?: number;

  /**
   * 值变化回调
   */
  onChange?: (value: string) => void;

  /**
   * 获得焦点回调
   */
  onFocus?: () => void;

  /**
   * 失去焦点回调
   */
  onBlur?: () => void;
}

/**
 * 默认导出 VInput 组件
 */
export default VInput;

export { VInput };