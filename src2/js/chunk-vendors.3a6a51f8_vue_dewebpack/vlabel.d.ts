/**
 * VLabel 组件模块
 * 提供标签(Label)相关功能的TypeScript类型定义
 */

/**
 * VLabel 组件类或接口
 * 从 ./VLabel.ts 导入的默认导出
 */
export declare class VLabel {
  /**
   * 构造函数
   * @param options - 组件初始化选项
   */
  constructor(options?: VLabelOptions);
}

/**
 * VLabel 组件配置选项接口
 */
export interface VLabelOptions {
  /** 标签文本内容 */
  text?: string;
  /** 标签样式类名 */
  className?: string;
  /** 其他配置项 */
  [key: string]: unknown;
}

/**
 * 默认导出 VLabel 组件
 */
export default VLabel;