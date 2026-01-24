/**
 * React组件类型定义
 * 基于 React.forwardRef 的图标组件
 * Original Module ID: 31001
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 继承标准SVG元素的所有属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
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
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标的SVG路径数据
   */
  icon: [number, number, unknown[], string, string | string[]];
}

/**
 * 使用 forwardRef 包装的图标组件类型
 * 支持 ref 转发到底层 SVG 元素
 */
type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *