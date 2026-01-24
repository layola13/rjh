/**
 * 图标组件模块
 * 
 * @module IconComponent
 * @description 提供一个基于React的图标组件,支持通过forwardRef进行引用传递
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 
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
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据类型
 * 
 * @interface IconData
 * @description 定义图标的内部数据结构
 */
export interface IconData {
  /**
   * 图标的SVG路径数据或React元素
   */
  icon: React.ReactElement | string;

  /**
   * 图标的视图框配置
   * @optional
   */
  viewBox?: string;

  /**
   * 图标的宽度
   * @optional
   */
  width?: number;

  /**
   * 图标的高度
   * @optional
   */
  height?: number;
}

/**
 * 图标组件类型
 * 
 * @typedef {React.ForwardRefExoticComponent<IconComponentProps & React.RefAttributes<SVGSVGElement>>} IconComponent
 * @description 使用forwardRef包装的React图标组件,支持ref转发到底层SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @constant
 * @type {IconComponent}
 * @description 
 * 一个可复用的图标组件,接收属性并转发ref到SVG元素。
 * 内部集成了特定的图标数据,可通过props进行样式定制。
 * 
 * @example
 *