/**
 * 图标组件类型定义
 * Module: module_66138
 * Original ID: 66138
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconComponentProps {
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的旋转角度
   */
  rotate?: number;
  
  /**
   * 是否旋转动画
   */
  spin?: boolean;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他HTML SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件的引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 一个经过forwardRef包装的React组件，用于渲染SVG图标
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 这是一个使用forwardRef创建的图标组件，支持ref转发
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;