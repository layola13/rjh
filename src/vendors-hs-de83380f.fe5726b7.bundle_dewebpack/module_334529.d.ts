/**
 * React 图标组件模块
 * 
 * 这是一个基于 forwardRef 的图标组件，用于渲染特定的图标
 * 支持 ref 转发和自定义属性扩展
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
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
   * 是否禁用图标交互
   * @default false
   */
  disabled?: boolean;
}

/**
 * 图标组件类型定义
 * 支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *