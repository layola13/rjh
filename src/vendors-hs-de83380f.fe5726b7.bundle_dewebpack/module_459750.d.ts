/**
 * 图标组件模块
 * 
 * 该模块导出一个React forwardRef包装的图标组件。
 * 基于通用图标包装组件,支持所有标准的React ref转发功能。
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * 图标组件的属性接口
 * 
 * 定义图标组件接受的所有属性,包括标准的React DOM属性和自定义图标属性
 */
export interface IconProps {
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标大小(像素值或预设尺寸)
   */
  size?: number | 'small' | 'medium' | 'large';
  
  /**
   * 图标颜色(CSS颜色值)
   */
  color?: string;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 可访问性标签
   */
  'aria-label'?: string;
  
  /**
   * 其他HTML SVG元素属性
   */
  [key: string]: unknown;
}

/**
 * 图标元素的引用类型
 * 通常指向底层的SVG元素
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个支持ref转发的React组件,允许父组件直接访问底层的SVG元素。
 * 使用ForwardRefExoticComponent确保正确的类型推断和ref转发行为。
 * 
 * @example
 *