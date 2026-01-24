/**
 * 图标组件模块
 * 
 * 该模块导出一个基于 forwardRef 的 React 图标组件。
 * 组件通过组合基础图标组件和特定图标数据来创建可复用的图标元素。
 * 
 * @module IconComponent
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 
 * @interface IconComponentProps
 * @template T - 额外的自定义属性类型
 */
export interface IconComponentProps<T = Record<string, unknown>> {
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
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 其他额外属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 定义图标的 SVG 路径或配置信息
 * 
 * @interface IconData
 */
export interface IconData {
  /**
   * 图标名称
   */
  name?: string;
  
  /**
   * SVG 路径数据
   */
  path?: string | string[];
  
  /**
   * 视图框尺寸
   */
  viewBox?: string;
  
  /**
   * 其他图标配置
   */
  [key: string]: unknown;
}

/**
 * 基础图标组件的属性接口
 * 
 * @interface BaseIconComponentProps
 */
export interface BaseIconComponentProps extends IconComponentProps {
  /**
   * 图标数据对象
   */
  icon: IconData;
  
  /**
   * Ref 引用
   */
  ref?: React.Ref<HTMLElement>;
}

/**
 * 前向引用的图标组件类型
 * 
 * @typedef {React.ForwardRefExoticComponent<IconComponentProps & React.RefAttributes<HTMLElement>>} IconComponent
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个使用 React.forwardRef 创建的组件，支持 ref 转发。
 * 它将接收到的所有属性与预定义的图标数据合并，然后传递给基础图标组件进行渲染。
 * 
 * @example
 *