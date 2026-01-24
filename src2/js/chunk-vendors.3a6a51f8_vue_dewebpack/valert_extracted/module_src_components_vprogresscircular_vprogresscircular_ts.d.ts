/**
 * VProgressCircular 组件类型定义
 * 一个可定制的圆形进度指示器组件
 */

import Vue, { VNode, CreateElement } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * 组件 Props 接口
 */
export interface VProgressCircularProps {
  /** 是否为按钮模式（增加额外的尺寸） */
  button?: boolean;
  
  /** 是否显示不确定状态的动画 */
  indeterminate?: boolean;
  
  /** SVG 的旋转角度（度数） */
  rotate?: number | string;
  
  /** 圆形进度条的尺寸（像素） */
  size?: number | string;
  
  /** 进度条的宽度（像素） */
  width?: number | string;
  
  /** 当前进度值（0-100） */
  value?: number | string;
  
  /** 进度条的颜色 */
  color?: string;
}

/**
 * 组件 Data 接口
 */
export interface VProgressCircularData {
  /** 圆形的半径 */
  radius: number;
}

/**
 * 组件计算属性接口
 */
export interface VProgressCircularComputed {
  /** 计算后的组件尺寸（考虑按钮模式） */
  calculatedSize: number;
  
  /** 圆的周长 */
  circumference: number;
  
  /** CSS 类名对象 */
  classes: Record<string, boolean>;
  
  /** 标准化后的进度值（0-100 之间） */
  normalizedValue: number;
  
  /** SVG stroke-dasharray 属性值 */
  strokeDashArray: number;
  
  /** SVG stroke-dashoffset 属性值 */
  strokeDashOffset: string;
  
  /** SVG stroke 宽度 */
  strokeWidth: number;
  
  /** 组件根元素的样式对象 */
  styles: {
    height: string;
    width: string;
  };
  
  /** SVG 元素的样式对象 */
  svgStyles: {
    transform: string;
  };
  
  /** SVG viewBox 的尺寸 */
  viewBoxSize: number;
}

/**
 * 组件方法接口
 */
export interface VProgressCircularMethods {
  /**
   * 生成 SVG circle 元素
   * @param name - circle 的名称（用于类名）
   * @param offset - stroke-dashoffset 值
   * @returns VNode
   */
  genCircle(name: string, offset: number | string): VNode;
  
  /**
   * 生成 SVG 元素
   * @returns VNode
   */
  genSvg(): VNode;
  
  /**
   * 生成信息容器元素（用于插槽内容）
   * @returns VNode
   */
  genInfo(): VNode;
  
  /**
   * 设置文本颜色（继承自 colorable mixin）
   * @param color - 颜色值
   * @param data - VNode 数据对象
   * @returns VNode 数据对象
   */
  setTextColor(color: string | undefined, data: any): any;
}

/**
 * VProgressCircular 组件实例类型
 */
export type VProgressCircularInstance = Vue & 
  VProgressCircularProps & 
  VProgressCircularData & 
  VProgressCircularComputed & 
  VProgressCircularMethods;

/**
 * VProgressCircular 组件构造函数
 */
declare const VProgressCircular: {
  new (): VProgressCircularInstance;
};

export default VProgressCircular;