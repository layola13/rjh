/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   * @default 16
   */
  size?: number | string;
  
  /**
   * 图标的颜色
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
}

/**
 * 图标数据接口
 * 描述SVG图标的路径和视图框信息
 */
export interface IconData {
  /**
   * SVG路径数据或完整的SVG元素
   */
  path?: string | React.ReactNode;
  
  /**
   * SVG视图框尺寸
   * @default "0 0 24 24"
   */
  viewBox?: string;
  
  /**
   * 图标的默认宽度
   */
  width?: number;
  
  /**
   * 图标的默认高度
   */
  height?: number;
}

/**
 * 前向引用的图标组件类型
 * 支持ref转发到底层SVG元素
 */
type IconForwardRefComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个经过forwardRef包装的React图标组件，
 * 支持将ref转发到内部的SVG元素。
 * 
 * @example
 *