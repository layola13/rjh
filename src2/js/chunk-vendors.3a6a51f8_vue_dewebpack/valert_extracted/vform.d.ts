/**
 * VForm 模块类型定义
 * 
 * 该模块提供表单组件的核心功能和类型定义
 * 
 * @module VForm
 * @since 1.0.0
 */

/**
 * VForm 组件类或接口
 * 
 * 表单组件的主要导出，提供表单渲染、验证和数据管理功能
 * 
 * @public
 */
export declare class VForm {
  /**
   * 创建 VForm 实例
   * 
   * @param options - 表单配置选项
   */
  constructor(options?: VFormOptions);
}

/**
 * VForm 配置选项接口
 * 
 * @public
 */
export interface VFormOptions {
  /** 表单初始数据 */
  readonly data?: Record<string, unknown>;
  
  /** 验证规则配置 */
  readonly rules?: Record<string, ValidationRule[]>;
  
  /** 是否启用自动验证 */
  readonly autoValidate?: boolean;
}

/**
 * 表单验证规则接口
 * 
 * @public
 */
export interface ValidationRule {
  /** 验证器函数 */
  readonly validator?: (value: unknown) => boolean | Promise<boolean>;
  
  /** 验证失败时的错误消息 */
  readonly message?: string;
  
  /** 是否必填 */
  readonly required?: boolean;
}

/**
 * 默认导出 VForm 组件
 * 
 * @public
 * @default
 */
export default VForm;