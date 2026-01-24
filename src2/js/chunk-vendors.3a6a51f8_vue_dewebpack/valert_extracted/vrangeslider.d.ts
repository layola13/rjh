/**
 * VRangeSlider组件模块
 * 提供双向范围滑块选择器功能
 * @module VRangeSlider
 */

/**
 * VRangeSlider组件类
 * 用于创建可交互的范围选择滑块，支持双手柄拖拽
 */
export declare class VRangeSlider {
  /**
   * 构造函数
   * @param options - 组件配置选项
   */
  constructor(options?: VRangeSliderOptions);
}

/**
 * VRangeSlider组件配置选项
 */
export interface VRangeSliderOptions {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 当前范围的起始值 */
  start?: number;
  /** 当前范围的结束值 */
  end?: number;
  /** 步长 */
  step?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 值变化回调函数 */
  onChange?: (start: number, end: number) => void;
}

/**
 * 默认导出VRangeSlider组件类
 */
export default VRangeSlider;

export { VRangeSlider };