/**
 * 图标组件模块
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

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
}

/**
 * 图标组件属性类型
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 
 * 这是一个带有 forwardRef 的图标组件，支持传递 ref 到内部的 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *