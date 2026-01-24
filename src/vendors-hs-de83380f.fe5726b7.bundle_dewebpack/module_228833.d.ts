/**
 * React组件：图标包装器
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 通过props传递和ref转发机制实现图标的渲染。
 */

import type { ForwardRefExoticComponent, RefAttributes, ForwardedRef } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 包含图标的SVG路径、视图框等信息
 */
export interface IconData {
  /**
   * SVG路径数据
   */
  path?: string | string[];
  
  /**
   * 视图框尺寸
   */
  viewBox?: string;
  
  /**
   * 其他图标元数据
   */
  [key: string]: unknown;
}

/**
 * 图标组件的完整属性类型
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 默认导出的图标组件类型
 * 
 * 这是一个使用React.forwardRef创建的组件，
 * 支持ref转发到底层的SVG元素
 */
declare const IconComponent: ForwardRefExoticComponent<IconComponentProps>;

export default IconComponent;