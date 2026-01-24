/**
 * React组件类型定义
 * 该模块导出一个使用forwardRef包装的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自SVG元素的所有标准属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default 24
   */
  size?: number | string;
  
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
   * 是否旋转图标
   * @default false
   */
  spin?: boolean;
  
  /**
   * 自定义图标数据
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 定义图标的SVG路径和视图框等元数据
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标的SVG路径数据
   */
  path: string | string[];
  
  /**
   * SVG视图框配置
   * @default '0 0 24 24'
   */
  viewBox?: string;
  
  /**
   * 图标的宽度
   */
  width?: number;
  
  /**
   * 图标的高度
   */
  height?: number;
}

/**
 * 图标组件类型
 * 使用forwardRef包装的React组件，支持ref转发到SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个经过forwardRef包装的React函数组件
 * 
 * @example
 *