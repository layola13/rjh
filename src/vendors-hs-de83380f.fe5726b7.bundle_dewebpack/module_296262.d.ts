/**
 * React组件类型定义
 * 该模块导出一个使用 forwardRef 创建的React图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承所有标准的SVG元素属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的大小（宽度和高度）
   */
  size?: number | string;
  
  /**
   * 图标颜色
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
  
  /**
   * 图标数据（SVG路径或其他配置）
   */
  icon?: unknown;
}

/**
 * 图标组件类型
 * 使用 ForwardRefExoticComponent 支持 ref 转发到底层的 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个通过 forwardRef 创建的React组件，可以接收ref并转发到内部的SVG元素
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;