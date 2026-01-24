/**
 * 图标组件模块
 * 
 * 该模块导出一个基于图标数据的React forwardRef组件。
 * 通过包装通用图标组件并传入特定图标数据来创建特定的图标实例。
 * 
 * @module module_199851
 * @originalId 199851
 */

import type * as React from 'react';

/**
 * 图标组件的属性接口
 * 
 * 定义了传递给图标组件的所有可能属性。
 * 继承自通用图标组件的属性类型。
 */
export interface IconComponentProps extends Record<string, unknown> {
  /**
   * 图标的大小（像素或CSS尺寸单位）
   * @example 16, '1.5em', '24px'
   */
  size?: number | string;
  
  /**
   * 图标的颜色（CSS颜色值）
   * @example '#000000', 'currentColor', 'rgb(255, 0, 0)'
   */
  color?: string;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 鼠标点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 鼠标悬停事件处理器
   */
  onMouseEnter?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 鼠标离开事件处理器
   */
  onMouseLeave?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * 图标组件类型
 * 
 * 这是一个React forwardRef组件，允许父组件访问底层SVG元素的引用。
 * 
 * @param props - 图标组件的属性
 * @param ref - 转发的引用，指向底层SVG元素
 * @returns React元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件实例
 * 
 * 这是一个预配置的图标组件，已绑定特定的图标数据。
 * 可以直接在React应用中使用。
 * 
 * @example
 *