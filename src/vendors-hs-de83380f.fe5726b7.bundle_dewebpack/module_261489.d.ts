/**
 * 图标组件模块
 * @module IconComponent
 * @description 这是一个使用 forwardRef 包装的 React 图标组件，支持 ref 转发
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * @interface IconComponentProps
 * @description 定义图标组件接受的所有属性
 */
export interface IconComponentProps {
  /**
   * 图标的大小
   * @type {number | string}
   * @optional
   */
  size?: number | string;

  /**
   * 图标的颜色
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
   * 自定义样式对象
   * @type {React.CSSProperties}
   * @optional
   */
  style?: React.CSSProperties;

  /**
   * 其他任意 HTML 属性
   */
  [key: string]: unknown;
}

/**
 * SVG 图标数据接口
 * @interface IconData
 * @description 描述图标的 SVG 路径和属性数据
 */
export interface IconData {
  /**
   * SVG 视图框坐标
   * @type {string}
   */
  viewBox: string;

  /**
   * SVG 路径数据
   * @type {string | string[]}
   */
  path: string | string[];

  /**
   * 图标宽度
   * @type {number}
   * @optional
   */
  width?: number;

  /**
   * 图标高度
   * @type {number}
   * @optional
   */
  height?: number;
}

/**
 * 图标组件的 Ref 类型
 * @description 组件 ref 指向的 SVG 元素类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 默认导出的图标组件
 * @description 使用 React.forwardRef 创建的图标组件，支持 ref 转发到底层 SVG 元素
 * 
 * @example
 *