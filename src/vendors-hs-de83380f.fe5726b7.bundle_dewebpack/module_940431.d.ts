/**
 * React 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * @interface IconComponentProps
 * @extends {SVGProps<SVGSVGElement>} 继承标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @type {number | string}
   * @optional
   */
  size?: number | string;

  /**
   * 图标颜色
   * @type {string}
   * @optional
   */
  color?: string;

  /**
   * 自定义类名
   * @type {string}
   * @optional
   */
  className?: string;

  /**
   * 图标样式对象
   * @type {React.CSSProperties}
   * @optional
   */
  style?: React.CSSProperties;

  /**
   * 图标的 ARIA 标签（用于无障碍访问）
   * @type {string}
   * @optional
   */
  'aria-label'?: string;
}

/**
 * 图标组件类型
 * 使用 forwardRef 创建的组件，支持 ref 转发到底层 SVG 元素
 * 
 * @typedef {ForwardRefExoticComponent} IconComponent
 * @example
 *