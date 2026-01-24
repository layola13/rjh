/**
 * React图标组件类型定义
 * 基于React.forwardRef的图标封装组件
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的内联样式
   */
  style?: React.CSSProperties;
}

/**
 * 图标引用类型
 * 支持通过ref访问底层SVG元素
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 使用forwardRef包装的函数组件，支持ref转发
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 该组件封装了特定的图标定义，支持所有标准SVG属性和ref转发
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;