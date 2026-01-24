/**
 * 图标组件类型定义
 * Module: module_198142
 * Original ID: 198142
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自 SVG 元素的所有标准属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的旋转角度
   */
  spin?: boolean;
  
  /**
   * 自定义图标数据
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
   * SVG 路径数据
   */
  path: string | string[];
  
  /**
   * 视图盒子尺寸
   * @default [0, 0, 1024, 1024]
   */
  viewBox?: string;
  
  /**
   * 图标主题
   */
  theme?: 'filled' | 'outlined' | 'twoTone';
}

/**
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 支持 forwardRef 的 React 组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 使用 React.forwardRef 包装，支持 ref 转发
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;