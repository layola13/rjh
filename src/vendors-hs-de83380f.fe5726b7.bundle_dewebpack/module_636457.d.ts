/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准SVG元素属性
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标大小
   */
  size?: string | number;
  
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
  
  /**
   * 图标数据对象
   * @internal
   */
  icon?: IconData;
}

/**
 * 图标数据结构
 * @internal
 */
export interface IconData {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG路径数据
   */
  path: string | string[];
  
  /**
   * 视图框尺寸
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
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个转发引用的图标组件，支持所有标准SVG属性
 * 
 * @example
 *