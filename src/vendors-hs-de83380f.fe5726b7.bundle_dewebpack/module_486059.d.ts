/**
 * 图标组件模块
 * 这是一个React图标组件的类型定义，使用forwardRef包装以支持ref转发
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承SVG元素的所有标准属性
 */
interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 图标的大小（宽度和高度）
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的标题（用于无障碍访问）
   */
  title?: string;
  
  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 支持ref转发的React组件，ref指向SVGSVGElement
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个使用forwardRef包装的函数组件，可以接收ref并转发到内部的SVG元素
 * 
 * @example
 *