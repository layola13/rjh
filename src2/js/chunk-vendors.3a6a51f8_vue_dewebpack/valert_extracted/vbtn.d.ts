/**
 * VBtn组件模块
 * 提供按钮组件的导出
 * @module VBtn
 */

/**
 * VBtn按钮组件类
 * 用于渲染可交互的按钮元素
 */
export declare class VBtn {
  /**
   * 构造函数
   * @param options - 按钮配置选项
   */
  constructor(options?: VBtnOptions);
}

/**
 * VBtn组件配置选项接口
 */
export interface VBtnOptions {
  /** 按钮文本内容 */
  text?: string;
  /** 按钮类型 */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为加载状态 */
  loading?: boolean;
  /** 点击事件回调 */
  onClick?: (event: MouseEvent) => void;
}

/**
 * 默认导出VBtn组件
 */
export default VBtn;

export { VBtn };