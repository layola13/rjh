/**
 * 图标组件模块
 * 
 * 该模块导出一个基于forwardRef的React图标组件，
 * 通过组合通用图标组件和特定图标数据来创建可复用的图标元素。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 扩展标准SVG元素属性，支持所有原生SVG特性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
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
}

/**
 * 图标数据结构接口
 * 定义图标的路径、视图框等SVG核心属性
 */
export interface IconDefinition {
  /**
   * SVG路径数据或子元素
   */
  path: string | React.ReactNode;
  
  /**
   * SVG视图框配置
   * @example '0 0 24 24'
   */
  viewBox?: string;
  
  /**
   * 图标名称标识
   */
  name?: string;
}

/**
 * 图标组件类型定义
 * 使用ForwardRefExoticComponent确保ref转发能力
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个支持ref转发的React函数组件，用于渲染特定的SVG图标。
 * 组件内部将传入的props与预定义的图标数据合并，
 * 并通过通用图标包装器组件进行渲染。
 * 
 * @example
 *