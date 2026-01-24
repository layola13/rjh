/**
 * 图标组件类型定义
 * Module: module_631757
 * Original ID: 631757
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素的所有属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标大小
   */
  size?: string | number;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 图标类名
   */
  className?: string;
  
  /**
   * 图标样式
   */
  style?: React.CSSProperties;
  
  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 使用forwardRef包装，支持ref转发到SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个React前向引用组件，允许父组件访问底层SVG元素的ref
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;