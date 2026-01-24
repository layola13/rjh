/**
 * React组件：转发ref的图标包装器
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG路径数据
   */
  path: string | string[];
  
  /**
   * 视图盒子尺寸
   */
  viewBox?: string;
  
  /**
   * 其他图标配置
   */
  [key: string]: unknown;
}

/**
 * 组件属性类型，结合了基础属性和ref属性
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 导出的图标组件类型
 * 这是一个转发ref的React组件，渲染一个SVG图标
 */
declare const IconComponent: ForwardRefExoticComponent<IconComponentProps>;

export default IconComponent;