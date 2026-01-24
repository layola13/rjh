/**
 * React Icon Component Module
 * 
 * 此模块导出一个使用forwardRef包装的React图标组件
 * 用于在React应用中渲染可引用的图标元素
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素属性
 */
export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据（通常是SVG路径或图标配置）
   */
  icon?: unknown;
}

/**
 * 图标组件类型
 * 使用ForwardRef包装，支持ref转发到底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *