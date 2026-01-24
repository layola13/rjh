/**
 * 图标组件模块
 * @module IconComponent
 * @description 基于React的可转发引用图标组件,封装了图标的渲染逻辑
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的属性接口
 * @interface IconComponentProps
 * @description 定义图标组件接收的所有属性
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标的大小
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的笔画宽度
   */
  strokeWidth?: number | string;
  
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
 * 图标SVG定义接口
 * @interface IconDefinition
 * @description 定义图标的SVG路径和属性
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG路径数据或其他SVG子元素
   */
  icon: React.ReactNode | string;
  
  /**
   * 视图框属性
   * @default '0 0 24 24'
   */
  viewBox?: string;
}

/**
 * 图标组件类型
 * @typedef {ForwardRefExoticComponent} IconComponent
 * @description 支持ref转发的React图标组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * @description 一个可转发ref的React SVG图标组件,接受标准的SVG属性和自定义图标属性
 * @example
 *