/**
 * 图标组件模块
 * 使用 forwardRef 包装的 React 图标组件
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 继承标准 SVG 元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * 图标的尺寸大小
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
   * 图标数据对象
   */
  icon?: IconData;
}

/**
 * 图标数据结构
 */
export interface IconData {
  /**
   * 图标名称
   */
  name?: string;
  
  /**
   * 图标主题
   */
  theme?: string;
  
  /**
   * SVG 路径数据
   */
  path?: string | string[];
  
  /**
   * 视图盒子属性
   */
  viewBox?: string;
}

/**
 * 图标组件类型
 * 支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个使用 forwardRef 创建的 React 组件，支持 ref 转发
 * 
 * @example
 *