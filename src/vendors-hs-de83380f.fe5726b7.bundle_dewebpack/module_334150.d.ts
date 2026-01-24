/**
 * React 图标组件模块
 * 
 * 这是一个使用 forwardRef 包装的图标组件，支持 ref 转发
 * 通过组合基础图标组件和特定图标数据创建最终的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 * 扩展自标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGAttributes<SVGElement> {
  /**
   * 图标的大小（宽度和高度）
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
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标标题，用于无障碍访问
   */
  title?: string;
  
  /**
   * 图标数据对象（内部使用）
   */
  icon?: IconData;
  
  /**
   * 其他扩展属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据结构接口
 * 定义图标的元数据和路径信息
 */
export interface IconData {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG 路径数据
   */
  path: string | string[];
  
  /**
   * 视图框尺寸
   */
  viewBox?: string;
  
  /**
   * 默认宽度
   */
  width?: number;
  
  /**
   * 默认高度
   */
  height?: number;
}

/**
 * 图标组件类型
 * 
 * 这是一个使用 forwardRef 创建的组件，支持 ref 转发到底层 SVG 元素
 * 
 * @example
 *