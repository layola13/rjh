/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标基础属性接口
 * 扩展自标准SVG元素属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标颜色
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
   * 图标数据对象
   * @internal
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述图标的SVG路径和视图框配置
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG路径数据
   */
  paths: string[];
  
  /**
   * SVG viewBox属性
   * @default "0 0 24 24"
   */
  viewBox?: string;
  
  /**
   * 图标宽度
   */
  width?: number;
  
  /**
   * 图标高度
   */
  height?: number;
}

/**
 * 图标组件引用类型
 * 指向底层SVG元素
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 支持ref转发的React组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *