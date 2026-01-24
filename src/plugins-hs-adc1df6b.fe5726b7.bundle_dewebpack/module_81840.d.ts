/**
 * 属性栏标签按钮组件的类型定义
 * @module PropertyBarLabelButtons
 */

/**
 * 按钮配置项接口
 */
export interface ButtonConfig {
  /** 按钮类型标识 */
  type: string;
  /** 默认图标名称 */
  icon: string;
  /** 激活状态图标名称 */
  activeIcon?: string;
  /** 工具提示文本 */
  tooltip?: string;
}

/**
 * 组件数据配置接口
 */
export interface PropertyBarLabelButtonsData {
  /** 按钮显示行数，默认为3 */
  rows?: number;
  /** 按钮点击事件回调 */
  onClick?: (button: ButtonConfig) => void;
  /** 按钮配置列表 */
  buttons?: ButtonConfig[];
  /** 自定义CSS类名 */
  className?: string;
  /** 当前激活的按钮类型 */
  activedType?: string;
}

/**
 * 组件属性接口
 */
export interface PropertyBarLabelButtonsProps {
  /** 组件配置数据 */
  data: PropertyBarLabelButtonsData;
}

/**
 * 属性栏标签按钮组件
 * 
 * 用于展示一组可切换的标签按钮，支持激活状态、工具提示和自定义图标
 * 
 * @param props - 组件属性
 * @returns React函数组件
 * 
 * @example
 *