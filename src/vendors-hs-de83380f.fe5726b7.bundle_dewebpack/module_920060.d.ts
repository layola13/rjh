/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标基础属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否启用旋转动画
   */
  spin?: boolean;
  
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
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 支持 ref 转发的图标组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 一个基于 SVG 的图标组件，支持自定义尺寸、颜色、旋转等属性。
 * 使用 forwardRef 包装以支持 ref 转发。
 * 
 * @example
 *