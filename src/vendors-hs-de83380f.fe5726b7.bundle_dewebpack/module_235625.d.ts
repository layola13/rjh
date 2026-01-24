/**
 * Module: module_235625
 * 
 * React图标组件模块
 * 该模块导出一个使用forwardRef封装的图标组件
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础图标组件的所有属性
 */
export interface IconComponentProps {
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标大小
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标引用类型
 * 可以是SVGSVGElement或HTMLElement
 */
export type IconRef = SVGSVGElement | HTMLElement | null;

/**
 * 图标组件类型定义
 * 使用ForwardRefExoticComponent包装，支持ref转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件通过React.forwardRef创建，允许父组件访问底层DOM元素
 * 内部使用了默认图标配置，并通过属性合并机制支持自定义配置
 * 
 * @example
 *