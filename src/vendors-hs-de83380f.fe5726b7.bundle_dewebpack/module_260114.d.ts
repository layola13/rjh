/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 支持ref转发和自定义属性扩展
 * 
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 扩展自标准SVG元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
   */
  size?: number | string;

  /**
   * 图标颜色
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
   * 图标标题，用于可访问性
   */
  title?: string;

  /**
   * 其他任意SVG属性
   */
  [key: string]: any;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个使用React.forwardRef创建的组件，
 * 允许父组件通过ref访问底层的SVG元素
 * 
 * @example
 *