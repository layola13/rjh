/**
 * React组件：图标组件包装器
 * 
 * 该模块导出一个转发引用(forwardRef)的React图标组件，
 * 通过组合基础图标组件和图标数据来创建可复用的图标实例。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承标准SVG元素的所有属性
 */
export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 图标大小（像素或CSS单位）
   */
  size?: string | number;
  
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
}

/**
 * 图标数据接口
 * 定义图标的SVG路径和视图配置
 */
export interface IconData {
  /**
   * SVG路径数据
   */
  path: string | string[];
  
  /**
   * SVG viewBox属性
   */
  viewBox?: string;
  
  /**
   * 图标的原始宽度
   */
  width?: number;
  
  /**
   * 图标的原始高度
   */
  height?: number;
}

/**
 * 导出的图标组件类型
 * 使用ForwardRefExoticComponent确保正确的ref转发
 */
type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *