/**
 * 图标组件模块
 * 
 * 该模块导出一个React forwardRef组件,用于渲染图标。
 * 该组件基于一个默认图标组件,并支持所有标准的React props和ref转发。
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 
 * 继承标准的React SVG元素属性,支持所有SVG相关的props。
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的大小(宽度和高度)
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的类名,用于自定义样式
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 其他任意SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个forwardRef组件,支持ref转发到底层的SVG元素。
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * 该组件是一个React forwardRef组件,渲染特定的图标。
 * 
 * @example
 *