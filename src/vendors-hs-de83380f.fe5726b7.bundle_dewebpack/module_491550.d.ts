/**
 * 图标组件模块
 * 
 * 这是一个React图标组件的TypeScript类型定义文件，
 * 导出了一个带有ref转发功能的图标组件。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自SVG元素的所有标准属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的大小
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
}

/**
 * 图标组件类型
 * 
 * 这是一个通过forwardRef创建的React组件，
 * 支持ref转发到底层的SVG元素。
 * 
 * @example
 *