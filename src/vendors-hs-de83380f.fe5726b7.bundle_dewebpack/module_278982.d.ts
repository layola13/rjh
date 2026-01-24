/**
 * Icon component module
 * 图标组件模块
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * 该模块导出一个支持 ref 转发的 React 图标组件。
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * 图标组件的基础属性
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size
   * 图标大小
   */
  size?: string | number;
  
  /**
   * Icon color
   * 图标颜色
   */
  color?: string;
  
  /**
   * Additional CSS class name
   * 额外的 CSS 类名
   */
  className?: string;
  
  /**
   * Inline style object
   * 内联样式对象
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with ref forwarding support
 * 支持 ref 转发的图标组件
 * 
 * @example
 *