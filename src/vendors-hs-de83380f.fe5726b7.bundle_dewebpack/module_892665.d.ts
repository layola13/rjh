/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的React组件，
 * 用于渲染特定的图标元素。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 
 * @remarks
 * 该组件接受标准的图标属性，并支持ref转发
 */
export interface IconComponentProps {
  /**
   * 图标的样式类名
   */
  className?: string;
  
  /**
   * 图标的内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的旋转角度
   */
  rotate?: number;
  
  /**
   * 图标的自定义属性
   */
  [key: string]: unknown;
}

/**
 * 带有ref转发的图标组件类型
 * 
 * @remarks
 * 使用forwardRef创建，支持将ref传递给底层DOM元素或组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<HTMLElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *