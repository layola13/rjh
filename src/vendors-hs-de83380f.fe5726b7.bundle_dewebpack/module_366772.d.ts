/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性
 * 扩展自 SVG 元素的所有原生属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标标题，用于无障碍访问
   */
  title?: string;
  
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
 * 图标数据定义
 * 描述 SVG 图标的路径和属性
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG 视图框
   * @example "0 0 24 24"
   */
  viewBox?: string;
  
  /**
   * SVG 路径数据或子元素
   */
  path: string | React.ReactNode;
  
  /**
   * 图标标签或分类
   */
  tags?: string[];
}

/**
 * 转发引用的图标组件类型
 * 
 * 这是一个通用的图标组件，支持 ref 转发到底层的 SVG 元素
 * 
 * @example
 *