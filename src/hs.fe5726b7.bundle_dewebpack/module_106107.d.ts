/**
 * Popover组件库模块
 * 提供弹出层、提示框、触发器等UI组件的类型定义
 * @module PopoverComponents
 */

/**
 * 弹出层项组件的类型定义
 */
export type PopoverItem = any;

/**
 * 重量级组件项的类型定义
 */
export type HeavyItem = any;

/**
 * 弹出层触发器组件的类型定义
 */
export type PopoverTrigger = any;

/**
 * 工具提示组件的类型定义
 */
export type Tooltip = any;

/**
 * 重量级组件的类型定义
 */
export type Heavy = any;

/**
 * 弹出层组件库导出对象
 * 包含完整的弹出层相关组件集合
 */
export interface PopoverComponentsModule {
  /**
   * 弹出层项组件
   * 用于在弹出层中渲染单个可交互项
   */
  PopoverItem: PopoverItem;

  /**
   * 重量级项组件
   * 用于渲染复杂或资源密集型的弹出层项
   */
  HeavyItem: HeavyItem;

  /**
   * 弹出层触发器组件
   * 用于触发弹出层显示/隐藏的交互元素
   */
  PopoverTrigger: PopoverTrigger;

  /**
   * 工具提示组件
   * 用于显示简短的提示信息
   */
  Tooltip: Tooltip;

  /**
   * 重量级组件
   * 用于渲染复杂的弹出层内容容器
   */
  Heavy: Heavy;
}

/**
 * 默认导出：弹出层组件库
 */
declare const popoverComponents: PopoverComponentsModule;

export default popoverComponents;