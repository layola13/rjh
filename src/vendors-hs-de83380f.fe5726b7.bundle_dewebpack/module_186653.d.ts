/**
 * 图标组件类型定义
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否水平翻转
   */
  spin?: boolean;
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 这是一个带有 ref 转发的 React 组件，用于渲染 SVG 图标
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 支持 ref 转发到底层的 SVG 元素
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;