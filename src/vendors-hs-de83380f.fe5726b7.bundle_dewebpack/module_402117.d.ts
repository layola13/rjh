/**
 * React图标组件模块
 * 
 * 该模块导出一个图标组件,通过React.forwardRef包装,
 * 支持ref转发,并使用通用图标组件包装器渲染特定的图标内容。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 定义了图标组件接受的所有属性
 */
export interface IconProps {
  /**
   * 图标的尺寸,可以是数字(像素)或CSS尺寸字符串
   * @example 24
   * @example "2rem"
   */
  size?: number | string;

  /**
   * 图标的颜色,接受任何有效的CSS颜色值
   * @example "#ff0000"
   * @example "currentColor"
   */
  color?: string;

  /**
   * 图标的类名,用于应用自定义样式
   */
  className?: string;

  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;

  /**
   * 图标的标题,用于可访问性
   */
  title?: string;

  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;

  /**
   * 其他SVG元素支持的属性
   */
  [key: string]: any;
}

/**
 * 图标组件的Ref类型
 * 通常指向底层的SVG元素
 */
export type IconRef = SVGSVGElement;

/**
 * 默认导出的图标组件
 * 
 * 这是一个使用React.forwardRef创建的图标组件,支持ref转发。
 * 组件内部使用通用图标包装器渲染特定的图标内容。
 * 
 * @example
 *