/**
 * React图标组件模块
 * 该模块导出一个使用forwardRef包装的React图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 * 扩展自标准HTML SVG元素属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * 图标的描边宽度
   * @default 2
   */
  strokeWidth?: number | string;
  
  /**
   * 自定义CSS类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型定义
 * 支持ref转发的React函数组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 该组件是一个使用React.forwardRef包装的SVG图标组件,
 * 支持所有标准的SVG属性,并提供ref转发功能以便直接访问底层SVG元素
 * 
 * @example
 *