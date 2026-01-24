/**
 * 图标组件模块
 * 提供一个转发ref的React图标组件
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准的SVG元素属性
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标的尺寸大小
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
 * 图标数据类型
 * 包含图标的路径、视图框等SVG相关信息
 */
export interface IconData {
  /**
   * SVG路径数据
   */
  path?: string | string[];
  
  /**
   * SVG视图框
   */
  viewBox?: string;
  
  /**
   * 其他SVG属性
   */
  [key: string]: unknown;
}

/**
 * 转发ref的图标组件类型
 * 支持所有IconProps属性，并可以转发ref到底层SVG元素
 */
type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

/**
 * 默认导出的图标组件
 * 使用forwardRef包装，支持ref转发
 * 
 * @example
 *