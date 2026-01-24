/**
 * 图标组件模块
 * 封装了一个使用forwardRef的React图标组件
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的属性类型
 * 继承自基础图标组件的所有属性
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 自定义className
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据（SVG路径或配置）
   */
  icon?: unknown;
}

/**
 * 图标组件的Ref类型
 * 通常指向SVG元素
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 带有ref转发功能的图标组件
 * 
 * @example
 *