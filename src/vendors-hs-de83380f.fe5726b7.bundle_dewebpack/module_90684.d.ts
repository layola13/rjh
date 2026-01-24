/**
 * 图标组件的TypeScript类型定义
 * Module: module_90684
 * Original ID: 90684
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自SVG元素的所有标准属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸，可以是数字（像素）或字符串
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 图标样式类名
   */
  className?: string;
  
  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的原始SVG数据
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述SVG图标的元数据和路径信息
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标的SVG视图框
   */
  viewBox?: string;
  
  /**
   * 图标的SVG路径数据
   */
  path?: string | string[];
  
  /**
   * 图标的宽度
   */
  width?: number;
  
  /**
   * 图标的高度
   */
  height?: number;
}

/**
 * 图标组件类型
 * 支持ref转发的React函数组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *