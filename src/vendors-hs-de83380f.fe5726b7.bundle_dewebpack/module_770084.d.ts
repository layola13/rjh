/**
 * 图标组件模块
 * @module IconComponent
 * @description 这是一个基于 React 的图标组件，使用 forwardRef 支持 ref 转发
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * @interface IconComponentProps
 * @extends {SVGProps<SVGSVGElement>} 继承所有标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
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
   * 自定义图标数据
   * 从 i.default (模块 762947) 注入的图标定义
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * @interface IconDefinition
 * @description 定义图标的 SVG 路径和元数据
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG 路径数据
   */
  path: string | string[];
  
  /**
   * 视图框尺寸
   * @default '0 0 24 24'
   */
  viewBox?: string;
  
  /**
   * 图标宽度
   */
  width?: number;
  
  /**
   * 图标高度
   */
  height?: number;
}

/**
 * 图标组件类型
 * @typedef {ForwardRefExoticComponent} IconComponent
 * @description 带有 ref 转发功能的 React 图标组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * @constant
 * @type {IconComponent}
 * @description 使用 React.forwardRef 创建的图标组件，支持 ref 转发到底层的 SVG 元素
 * 
 * @example
 *