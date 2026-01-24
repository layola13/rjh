/**
 * React Icon Component Module
 * @module IconComponent
 * @description 提供一个基于React forwardRef的图标组件，支持ref转发和自定义属性
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * @description 继承标准SVG元素的所有属性，支持完整的SVG定制
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据（SVG路径或元素）
   * @internal 内部使用，由图标库提供
   */
  icon?: unknown;
}

/**
 * 图标组件类型定义
 * @description 一个支持ref转发的React函数组件，用于渲染SVG图标
 * 
 * @example
 *