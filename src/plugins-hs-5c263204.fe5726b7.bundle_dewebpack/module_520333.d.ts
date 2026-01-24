/**
 * 引导提示组件的类型声明
 * Module: module_520333
 * Original ID: 520333
 */

/**
 * 提示框的显示位置样式
 */
export type TipStyle = 'left' | 'right' | 'top' | 'bottom';

/**
 * 提示框的类型样式
 */
export type TipType = string;

/**
 * 提示框位置坐标
 */
export interface TipPosition {
  /** 距离左侧的像素值 */
  left?: number;
  /** 距离顶部的像素值 */
  top?: number;
}

/**
 * 步骤提示配置对象
 */
export interface StepTip {
  /** 目标元素，可以是CSS选择器字符串或DOM元素 */
  ele?: string | Element;
  /** 提示文本内容 */
  tip?: string;
  /** 提示框相对于目标元素的位置 */
  style?: TipStyle;
  /** 提示框的类型样式类名 */
  type?: TipType;
  /** 提示框与目标元素的间距（像素），默认20 */
  margin?: number;
  /** 当目标元素不存在或为document.documentElement时的绝对定位 */
  position?: TipPosition;
}

/**
 * 引导提示组件的属性接口
 */
export interface GuideTipProps {
  /** 是否显示步骤提示 */
  showStepTip?: boolean;
  /** 步骤提示配置对象 */
  stepTip?: StepTip;
  /** 提示框的top位置（像素） */
  top?: number;
  /** 提示框的left位置（像素） */
  left?: number;
  /** 是否可以关闭提示框 */
  canClose?: boolean;
}

/**
 * 引导提示组件
 * 用于在页面上显示带箭头的提示框，可以指向特定元素或显示在指定位置
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *