/**
 * 图标组件模块
 * 
 * 该模块导出一个基于 forwardRef 的 React 图标组件，
 * 用于渲染特定的图标，支持 ref 转发功能。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 
 * @remarks
 * 继承标准的 SVG 元素属性，支持所有标准的 SVG/React 属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   * @defaultValue '1em'
   */
  size?: string | number;

  /**
   * 图标的颜色
   * @defaultValue 'currentColor'
   */
  color?: string;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;

  /**
   * 图标旋转角度（度数）
   */
  rotate?: number;

  /**
   * 是否水平翻转图标
   * @defaultValue false
   */
  flip?: boolean;

  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 
 * @remarks
 * 这是一个支持 ref 转发的 React 组件，允许父组件访问底层 SVG 元素
 * 
 * @example
 *