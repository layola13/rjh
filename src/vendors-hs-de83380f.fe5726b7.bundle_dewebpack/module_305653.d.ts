/**
 * React图标组件模块
 * @module IconComponent
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承标准SVG元素属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸(宽度和高度)
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标标题(用于可访问性)
   */
  title?: string;
  
  /**
   * ARIA标签
   */
  'aria-label'?: string;
  
  /**
   * 图标数据(从内部图标库注入)
   */
  icon?: IconData;
}

/**
 * 内部图标数据结构
 * 包含SVG路径和其他元数据
 */
export interface IconData {
  /**
   * SVG路径数组或单个路径
   */
  path: string | string[];
  
  /**
   * 视图框尺寸
   * @default '0 0 24 24'
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
 * 图标组件类型
 * 支持ref转发的React函数组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个预配置了特定图标数据的React组件
 * 
 * @example
 *