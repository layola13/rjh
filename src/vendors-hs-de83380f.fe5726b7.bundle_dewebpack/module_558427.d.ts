/**
 * React组件类型定义
 * 导出一个forwardRef包装的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /**
   * 图标尺寸
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他HTML SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 默认导出的图标组件
 * 使用forwardRef包装，支持ref转发
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

export default IconComponent;