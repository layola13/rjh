/**
 * React组件类型定义 - 图标组件
 * Module: module_434250
 * Original ID: 434250
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准SVG元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸（宽度和高度）
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的标题，用于可访问性
   */
  title?: string;
  
  /**
   * 图标数据对象
   */
  icon?: IconDefinition;
  
  /**
   * 是否旋转图标
   */
  spin?: boolean;
  
  /**
   * 自定义属性
   */
  [key: string]: unknown;
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
   * 图标主题
   */
  theme?: 'filled' | 'outlined' | 'twoTone';
  
  /**
   * SVG路径或子元素
   */
  icon: React.ReactNode | string;
  
  /**
   * 视图盒子尺寸
   */
  viewBox?: string;
}

/**
 * 图标组件类型
 * 支持ref转发到底层SVG元素
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;