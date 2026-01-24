/**
 * React图标组件模块
 * 
 * 这是一个使用forwardRef包装的React组件，用于渲染特定的图标。
 * 该组件接受标准的React props并支持ref转发。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准SVG元素的所有属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
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
   * 图标标题，用于无障碍访问
   */
  title?: string;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个支持ref转发的React组件，可以直接访问底层的SVG元素。
 * 
 * @example
 *