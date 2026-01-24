/**
 * React组件类型定义
 * 这是一个使用forwardRef包装的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标尺寸，可以是数字（像素）或字符串 */
  size?: number | string;
  
  /** 图标颜色 */
  color?: string;
  
  /** 图标类名 */
  className?: string;
  
  /** 图标样式对象 */
  style?: React.CSSProperties;
  
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** 其他SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 使用forwardRef包装，支持ref转发到底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 这是一个支持ref转发的React函数组件
 */
declare const IconForwardRefComponent: IconComponent;

export default IconForwardRefComponent;